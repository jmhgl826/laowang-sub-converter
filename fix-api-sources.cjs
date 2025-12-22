const fs = require('fs');
let content = fs.readFileSync('src/views/Converter.vue', 'utf8');

// ????? apiSources ??
if (!content.includes("{ id: 'v1mk'")) {
    // ?? API ???
    const oldLine = "const selectedClient = ref('')";
    const newLine = `const selectedClient = ref('')
const selectedApi = ref('local')

// ?? API ???
const apiSources = [
  { id: 'local', name: '????', desc: '??????', url: '' },
  { id: 'v1mk', name: 'v1.mk', desc: '????API', url: 'https://api.v1.mk' },
  { id: 'xeton', name: 'xeton.dev', desc: '????API', url: 'https://sub.xeton.dev' },
  { id: 'dler', name: 'dler.io', desc: '????API', url: 'https://api.dler.io' }
]`;

    content = content.replace(oldLine, newLine);
    fs.writeFileSync('src/views/Converter.vue', content, 'utf8');
    console.log('API sources added');
} else {
    console.log('API sources already exist');
}
