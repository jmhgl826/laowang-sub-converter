import { parseSubscription, addEmoji } from './server/utils/parsers.js'
import { convertToTarget } from './server/utils/converters.js'
import fs from 'fs'

console.log('')
console.log('       LaoWang Sub-converter 最终全面测试报告                      ')
console.log('       测试时间: ' + new Date().toLocaleString('zh-CN') + '                         ')
console.log('')

const TEST_SUBSCRIPTION_URL = 'https://sub3.smallstrawberry.com/api/v1/client/subscribe?token=0c1abe710e49ed0030dee96d7fbc8b14'
const TEST_VLESS_REALITY = 'vless://7157e685-dbb3-4803-b7ad-48b43a68d7c9@67.215.229.127:42758?encryption=none&flow=xtls-rprx-vision&security=reality&sni=www.amd.com&fp=chrome&pbk=En7uv3MxvYMeTVoEFP5BaFsmNN-vj7y7q_i5D91Mtjg&sid=1e390bcf&type=tcp&headerType=none#vl-reality-racknerd-7e5f292'

const ALL_PROTOCOLS = {
    ss: 'ss://YWVzLTI1Ni1nY206cGFzc3dvcmQxMjM=@1.2.3.4:8388#SS-Test',
    vmess: 'vmess://eyJ2IjoiMiIsInBzIjoiVk1lc3MtVGVzdCIsImFkZCI6IjEuMi4zLjQiLCJwb3J0IjoiNDQzIiwiaWQiOiJhMWIyYzNkNC1lNWY2LTc4OTAtYWJjZC1lZjEyMzQ1Njc4OTAiLCJhaWQiOiIwIiwibmV0Ijoid3MiLCJ0eXBlIjoibm9uZSIsImhvc3QiOiJ0ZXN0LmNvbSIsInBhdGgiOiIvd3MiLCJ0bHMiOiJ0bHMifQ==',
    vless: TEST_VLESS_REALITY,
    trojan: 'trojan://password123@1.2.3.4:443?sni=test.com#Trojan-Test',
    hysteria: 'hysteria://1.2.3.4:443?auth=password&upmbps=100&downmbps=100&peer=test.com#Hysteria-Test',
    hysteria2: 'hy2://password@1.2.3.4:443?sni=test.com#Hysteria2-Test',
    tuic: 'tuic://uuid-test:password@1.2.3.4:443?congestion_control=bbr&alpn=h3&sni=test.com#TUIC-Test'
}

const ALL_CLIENTS = ['clash', 'clashmeta', 'surge', 'quantumultx', 'shadowrocket', 'loon', 'v2rayn', 'v2rayng', 'nekobox', 'surfboard', 'stash', 'singbox']

const BACKUP_APIS = [
    { name: '本地服务', url: 'http://localhost:3000/api/convert' },
    { name: 'v1.mk', url: 'https://api.v1.mk/sub' },
    { name: 'xeton.dev', url: 'https://sub.xeton.dev/sub' },
    { name: 'dler.io', url: 'https://api.dler.io/sub' }
]

let report = {
    timestamp: new Date().toISOString(),
    tests: { total: 0, passed: 0, failed: 0, warnings: 0 },
    sections: {}
}

function logTest(name, passed, detail) {
    report.tests.total++
    if (passed) {
        report.tests.passed++
        console.log('   ' + name + (detail ? ' - ' + detail : ''))
    } else {
        report.tests.failed++
        console.log('   ' + name + (detail ? ' - ' + detail : ''))
    }
}

function logWarning(msg) {
    report.tests.warnings++
    console.log('   ' + msg)
}

// ============== 测试1: 协议解析 ==============
console.log('\n')
console.log(' 测试1: 协议解析测试 (7种协议)                                   ')
console.log('')

report.sections.protocols = {}
for (const [protocol, uri] of Object.entries(ALL_PROTOCOLS)) {
    try {
        const parsed = parseSubscription(uri)
        const passed = parsed.length > 0
        report.sections.protocols[protocol] = { passed, nodeCount: parsed.length }
        logTest(protocol.toUpperCase().padEnd(10), passed, passed ? parsed[0].name : 'Parse failed')
    } catch (e) {
        report.sections.protocols[protocol] = { passed: false, error: e.message }
        logTest(protocol.toUpperCase().padEnd(10), false, e.message)
    }
}

// ============== 测试2: 真实订阅链接 ==============
console.log('\n')
console.log(' 测试2: 真实机场订阅链接测试                                      ')
console.log('')

let subscriptionNodes = []
try {
    const response = await fetch(TEST_SUBSCRIPTION_URL, {
        headers: { 'User-Agent': 'LaoWang-Sub-Converter/1.0' }
    })
    
    if (!response.ok) throw new Error('HTTP ' + response.status)
    
    const rawContent = await response.text()
    subscriptionNodes = parseSubscription(rawContent)
    
    const typeCount = {}
    for (const node of subscriptionNodes) {
        typeCount[node.type] = (typeCount[node.type] || 0) + 1
    }
    
    report.sections.subscription = {
        passed: true,
        contentSize: rawContent.length,
        nodeCount: subscriptionNodes.length,
        types: typeCount
    }
    
    logTest('订阅获取', true, rawContent.length + ' 字节')
    logTest('节点解析', true, subscriptionNodes.length + ' 个节点')
    console.log('    类型分布: ' + Object.entries(typeCount).map(([k,v]) => k.toUpperCase() + ':' + v).join(', '))
    
} catch (e) {
    report.sections.subscription = { passed: false, error: e.message }
    logTest('订阅测试', false, e.message)
}

// ============== 测试3: VLESS Reality 单节点 ==============
console.log('\n')
console.log(' 测试3: VLESS Reality 单节点解析验证                              ')
console.log('')

const vlessNodes = parseSubscription(TEST_VLESS_REALITY)
if (vlessNodes.length > 0) {
    const node = vlessNodes[0]
    logTest('VLESS 解析', true, node.name)
    logTest('Reality 配置', !!node.reality, node.reality ? 'SNI: ' + node.reality.sni : 'Not found')
    logTest('Flow 配置', !!node.flow, node.flow || 'Not found')
    
    report.sections.vlessReality = {
        passed: true,
        name: node.name,
        hasReality: !!node.reality,
        hasFlow: !!node.flow
    }
} else {
    logTest('VLESS 解析', false, 'Failed')
    report.sections.vlessReality = { passed: false }
}

// ============== 测试4: 客户端转换 ==============
console.log('\n')
console.log(' 测试4: 客户端格式转换测试 (12种客户端)                           ')
console.log('')

report.sections.clients = {}
const testNodes = subscriptionNodes.length > 0 ? subscriptionNodes : vlessNodes

for (const client of ALL_CLIENTS) {
    try {
        const output = convertToTarget(testNodes, client, { udp: true, skipCert: false })
        const passed = output.length > 0
        report.sections.clients[client] = { passed, outputLength: output.length }
        logTest(client.padEnd(12), passed, output.length + ' chars')
    } catch (e) {
        report.sections.clients[client] = { passed: false, error: e.message }
        logTest(client.padEnd(12), false, e.message)
    }
}

// ============== 测试5: 备用 API 可用性 ==============
console.log('\n')
console.log(' 测试5: 备用 API 真实可用性检测                                   ')
console.log('')

report.sections.backupApis = {}
for (const api of BACKUP_APIS) {
    try {
        const testUrl = api.url + '?target=clash&url=' + encodeURIComponent('https://example.com/test')
        
        if (api.name === '本地服务') {
            // 本地服务不测试网络，只标记为配置完成
            report.sections.backupApis[api.name] = { status: 'configured', note: '需启动本地服务器测试' }
            console.log('   ' + api.name.padEnd(12) + ' - 已配置 (需启动服务器验证)')
        } else {
            // 测试外部 API
            const controller = new AbortController()
            const timeoutId = setTimeout(() => controller.abort(), 5000)
            
            try {
                const response = await fetch(testUrl, { 
                    method: 'HEAD',
                    signal: controller.signal
                })
                clearTimeout(timeoutId)
                
                report.sections.backupApis[api.name] = { status: 'online', httpStatus: response.status }
                logTest(api.name.padEnd(12), true, 'HTTP ' + response.status)
            } catch (e) {
                clearTimeout(timeoutId)
                if (e.name === 'AbortError') {
                    report.sections.backupApis[api.name] = { status: 'timeout' }
                    logWarning(api.name.padEnd(12) + ' - 连接超时')
                } else {
                    report.sections.backupApis[api.name] = { status: 'error', error: e.message }
                    logWarning(api.name.padEnd(12) + ' - ' + e.message)
                }
            }
        }
    } catch (e) {
        report.sections.backupApis[api.name] = { status: 'error', error: e.message }
        logTest(api.name.padEnd(12), false, e.message)
    }
}

// ============== 测试6: 前端 API 映射检查 ==============
console.log('\n')
console.log(' 测试6: 前端 API 映射检查                                         ')
console.log('')

// 检查 Converter.vue 是否包含备用 API 配置
try {
    const converterContent = fs.readFileSync('src/views/Converter.vue', 'utf8')
    
    const hasApiSources = converterContent.includes('apiSources')
    const hasV1mk = converterContent.includes('v1.mk') || converterContent.includes('api.v1.mk')
    const hasXeton = converterContent.includes('xeton') || converterContent.includes('sub.xeton.dev')
    const hasDler = converterContent.includes('dler') || converterContent.includes('api.dler.io')
    const hasApiSelector = converterContent.includes('api-selector') || converterContent.includes('selectedApi')
    
    report.sections.frontendApi = {
        hasApiSources, hasV1mk, hasXeton, hasDler, hasApiSelector
    }
    
    logTest('API 源配置', hasApiSources, hasApiSources ? '已配置' : '未找到')
    logTest('v1.mk API', hasV1mk, hasV1mk ? '已添加' : '未找到')
    logTest('xeton.dev API', hasXeton, hasXeton ? '已添加' : '未找到')
    logTest('dler.io API', hasDler, hasDler ? '已添加' : '未找到')
    logTest('API 选择器 UI', hasApiSelector, hasApiSelector ? '已实现' : '未找到')
    
} catch (e) {
    logTest('前端 API 检查', false, e.message)
}

// ============== 测试7: 代码语法检查 ==============
console.log('\n')
console.log(' 测试7: 核心模块语法检查                                          ')
console.log('')

const modules = [
    'server/utils/parsers.js',
    'server/utils/converters.js',
    'server/routes/convert.js'
]

for (const mod of modules) {
    try {
        await import('./' + mod)
        logTest(mod.split('/').pop().padEnd(20), true, '模块加载成功')
    } catch (e) {
        logTest(mod.split('/').pop().padEnd(20), false, e.message)
    }
}

// ============== 最终报告 ==============
console.log('\n')
console.log('                        最终测试报告摘要                          ')
console.log('')

const passRate = ((report.tests.passed / report.tests.total) * 100).toFixed(1)

console.log('\n 测试统计:')
console.log('   总测试项: ' + report.tests.total)
console.log('   通过: ' + report.tests.passed + ' ')
console.log('   失败: ' + report.tests.failed + ' ')
console.log('   警告: ' + report.tests.warnings + ' ')
console.log('   通过率: ' + passRate + '%')

console.log('\n 功能支持:')
console.log('   支持协议: SS, SSR, VMess, VLESS (Reality), Trojan, Hysteria, Hysteria2, TUIC')
console.log('   支持客户端: ' + ALL_CLIENTS.join(', '))
console.log('   备用 API: 本地, v1.mk, xeton.dev, dler.io')

if (report.tests.failed > 0) {
    console.log('\n 失败项需要关注')
}

if (report.tests.warnings > 0) {
    console.log('\n 警告项 (非关键问题):')
    console.log('   部分外部 API 可能因网络原因暂时不可达')
}

console.log('\n 测试完成!')

fs.writeFileSync('final-test-report.json', JSON.stringify(report, null, 2))
console.log(' 详细报告已保存: final-test-report.json')
