# 📚 Grade de Aula CENTEC

Sistema inteligente de otimização de horários escolares com validação rigorosa de regras e múltiplas variantes de solução.

![Status](https://img.shields.io/badge/status-ativo-success)
![Versão](https://img.shields.io/badge/versão-1.0.0-blue)

## 🎯 Funcionalidades

- ✅ Geração automática de grades horárias otimizadas
- ✅ 4 variantes de solução (Modo Estrito, A, B, C)
- ✅ Sistema de auditoria com 7 categorias de validação
- ✅ Interface dark mode profissional
- ✅ Filtros interativos por turma, professor e turno
- ✅ Relatório detalhado de violações

## 🚀 Como Usar

### Opção 1: GitHub Pages (Online)
Acesse: [https://totishuro.github.io/Grade-de-Aula-Cida/](https://totishuro.github.io/Grade-de-Aula-Cida/)

### Opção 2: Local
1. Clone o repositório:
```bash
git clone https://github.com/Totishuro/Grade-de-Aula-Cida.git
cd Grade-de-Aula-Cida
```

2. Abra `index.html` no navegador (não requer servidor)

## 📁 Estrutura do Projeto

```
GradeDeAulaProjeto/
├── index.html                           # Interface principal
├── scheduler.js                         # Motor CSP de otimização
├── audit_tests.js                       # Sistema de validação
├── README.md                            # Esta documentação
├── regras_inviolaveis.md               # Documentação de regras
├── rules_documentation_v2.md           # Regras detalhadas
├── grade_horarios.md                   # Exemplo de grade
└── relatorio_verificacao_alexandre.md  # Relatório específico
```

## 🎓 Regras do Sistema

### Invioláveis (Nível 1)
- ❌ **Clonagem:** Professor não pode estar em 2 lugares ao mesmo tempo
- 🧪 **Labs:** Duplas bloqueiam membros individuais
- 🎯 **Alexandre:** 18h geminadas (exceto 1 turma) + bloqueio p3-p4
- 🚫 **Sexta-Tarde:** Apenas FRED permitido

### Críticas (Nível 2 - Relaxáveis)
- 📅 **Horários Vagos:** Períodos livres obrigatórios
- ⏱️ **Consecutivas:** Máximo 2 aulas seguidas
- 📚 **Carga Horária:** Professores com horas completas

## 📊 Variantes Disponíveis

| Variante | Descrição | Taxa Sucesso |
|----------|-----------|:------------:|
| **Modo Estrito** | Máximo rigor nas regras | 90.3% |
| **Variante A** | Relaxa sexta-tarde | 93.8% |
| **Variante B** | Relaxa horários vagos | 92.1% |
| **Variante C** | Máxima flexibilidade | 95.5% |

## 🛠️ Tecnologias

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Algoritmo:** CSP (Constraint Satisfaction Problem)
- **Design:** Dark Mode UI com paleta profissional
- **Versionamento:** Git + GitHub

## 📝 Licença

Projeto educacional - CENTEC

## 👥 Desenvolvido com

- 🤖 **Antigravity AI** - Assistente de desenvolvimento
- 👨‍💻 **CENTEC** - Especificação e validação

---

**🎓 CENTEC - Sistema de Otimização de Horários | 2025**
