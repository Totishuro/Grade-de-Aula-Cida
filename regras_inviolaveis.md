# 🛡️ REGRAS INVIOLÁVEIS - GRADE DE HORÁRIOS

**Documentação das Restrições Críticas (Hard Constraints)**  
**Última atualização:** 25/12/2025

---

## 🔴 NÍVEL 1: REGRAS ABSOLUTAMENTE INVIOLÁVEIS

Estas regras **NUNCA** podem ser quebradas em nenhuma variante da grade.

### 1. ❌ Clonagem Proibida
**Descrição:** Um professor NÃO pode estar em duas turmas no mesmo horário.

**Exemplo de violação:**
```
Segunda 1M: JULIANA em 1Q
Segunda 1M: JULIANA em 2A  ❌ INVÁLIDO
```

**Motivo:** Impossibilidade física - um professor não pode estar em dois lugares ao mesmo tempo.

---

### 2. 🧪 Bloqueio Lab/Duplas
**Descrição:** Professores que formam duplas de laboratório (ex: ADRIANAPEDRO) bloqueiam ambos os membros individuais no mesmo horário.

**Exemplo:**
```
Segunda 1M: ADRIANAPEDRO em 2Q
Segunda 1M: ADRIANA em 3A  ❌ INVÁLIDO (ADRIANA está bloqueada)
Segunda 1M: PEDRO em 1F    ❌ INVÁLIDO (PEDRO está bloqueado)
```

**Professores afetados:**
- ADRIANAPEDRO (bloqueia ADRIANA + PEDRO)
- DANIELFRED (bloqueia DANIEL + FRED)
- DANIELKENIA (bloqueia DANIEL + KENIA)
- EMERSONFRED (bloqueia EMERSON + FRED)
- EMERSONGIR (bloqueia EMERSON + GIRLAINE)
- EMERSONKENIA (bloqueia EMERSON + KENIA)
- DOMPAULO (bloqueia DOMINGOS + PAULO)
- ALINEFRED (bloqueia ALINEFAR + FRED)
- PEDRORAISSA (bloqueia PEDRO + RAISSA)

---

### 3. 🎯 Regra do Alexandre - Aulas Geminadas
**Descrição:** Alexandre DEVE ter aulas geminadas (2 consecutivas) em **TODAS** as 9 turmas que leciona.

**Flexibilização permitida:**
- Pode ter **1 turma** com aulas não-consecutivas (separadas)
- As outras **8 turmas** devem manter aulas geminadas

**Exemplo correto:**
```
1Q: Segunda p1M + Segunda p2M ✅ (Geminadas)
2Q: Quarta p1M + Quarta p2M   ✅ (Geminadas)
```

**Exemplo com flexibilização:**
```
1Q: Quinta p1M + Sexta p5M    ✅ (1 turma separada permitida)
2Q: Quarta p1M + Quarta p2M   ✅ (Geminadas)
...demais turmas geminadas...
```

**Restrição adicional:**
- ❌ **Bloqueio p3-p4:** Alexandre NÃO pode ter aulas consecutivas especificamente no bloco p3+p4
- ✅ Permitido: p2+p3 ou p4+p5

**Status atual:** ✅ 18/18h alocadas com TODAS as 9 turmas geminadas

---

### 4. 🔗 Aulas Geminadas Obrigatórias (Outros Professores)

Alguns professores têm regras específicas de aulas consecutivas:

| Professor | Regra | Turmas Afetadas |
|-----------|-------|-----------------|
| **ADRIANAPEDRO** | 4 aulas seguidas | 2Q (todas as 4h consecutivas) |
| **ALINEFAR** | 6 aulas em 3F, 2 por dia | 3F (distribuídas em 3 dias) |
| **ALINEFRED** | 4 num dia + 2 noutro | 1F (blocos de 4+2) |
| **EMERSONFRED** | 3 aulas seguidas | 3Q (todas consecutivas) |
| **EMERSONGIR** | 4 + 2 | 2F (blocos de 4+2) |

---

## 🟡 NÍVEL 2: REGRAS CRÍTICAS (Relaxáveis em Variantes Específicas)

Estas regras são muito importantes, mas podem ser flexibilizadas dependendo da variante escolhida.

### 5. 🚫 Sexta-Feira à Tarde - Bloqueio Total
**Descrição:** Apenas o professor FRED pode ter aulas na sexta-feira à tarde.

**Exceção:** FRED (único permitido)

**Variantes:**
- ✅ **Modo Estrito:** 100% bloqueada (exceto FRED)
- ✅ **Variante B:** 100% bloqueada (exceto FRED)
- ⚠️ **Variante A:** Relaxada
- ⚠️ **Variante C:** Relaxada (VICTOR e WENDEL podem ter aulas)

**Violações na Variante C:**
```
Sexta p1T: VICTOR em 3Q    ⚠️
Sexta p1T: WENDEL em 2F    ⚠️
Sexta p2T: VICTOR em 3F    ⚠️
```

---

### 6. 📅 Horários Vagos Obrigatórios (Checklist de Ouro)
**Descrição:** Algumas turmas precisam ter períodos completamente livres para atividades extracurriculares.

| Turma | Requisito |
|-------|-----------|
| **1Q** | Manhã livre INTEIRA (5h) + Tarde livre INTEIRA (5h) |
| **2Q** | 1M livre TODOS os dias + Tarde livre inteira num dia |
| **3F** | Manhã livre inteira num dia |
| **1F** | 1M livre TODOS os dias + Tarde livre inteira num dia |
| **1A** | 1M livre TODOS os dias |
| **2A** | 1M livre TODOS os dias |
| **2F** | 1M livre TODOS os dias |

**Variantes:**
- ✅ **Modo Estrito:** Apenas 2 violações
- ⚠️ **Variante A:** 7 violações
- ⚠️ **Variante B:** Relaxada
- ⚠️ **Variante C:** 7 violações

---

### 7. ⏱️ Aulas Consecutivas - Limite Geral
**Descrição:** Máximo de 2 aulas seguidas para todos os professores.

**Exceções (podem ter mais de 2 seguidas):**
- Professores de Laboratório (com `/` no nome)
- Professor JEFF

**Exemplo:**
```
Segunda p1M: JULIANA em 1Q
Segunda p2M: JULIANA em 2Q  ✅ (2 seguidas OK)
Segunda p3M: JULIANA em 3Q  ❌ (3 seguidas - violação, exceto Lab/JEFF)
```

---

## 📊 Comparativo de Variantes

| Variante | Taxa Sucesso | Alexandre | Sexta Tarde | Horários Vagos | Uso Recomendado |
|----------|--------------|-----------|-------------|----------------|-----------------|
| **Estrito** | 89.4% | ✅ 18/18h | ✅ 100% bloqueada | ❌ 2 violações | Máximo rigor nas regras |
| **Variante A** | 93.8% | ✅ 18/18h | ⚠️ Relaxada | ❌ 7 violações | Flexibilidade em sexta-tarde |
| **Variante B** | 92.1% | ✅ 18/18h | ✅ 100% bloqueada | ⚠️ Relaxada | Flexibilidade nos horários vagos |
| **Variante C** | **95.5%** | ✅ 18/18h | ⚠️ Relaxada | ⚠️ Relaxada | **Máxima flexibilidade** |

---

## 🎯 Priorização de Alocação

Para maximizar o sucesso da grade, o sistema segue esta ordem de prioridade:

1. **Professores de Laboratório** (Duplas com `/`)
   - Prioridade: 0 (mais alta)
   - Motivo: Menos flexibilidade (precisam de slots consecutivos)

2. **Alexandre**
   - Prioridade: 0.5
   - Motivo: Regra de geminação em 9 turmas

3. **Professores com disponibilidade restrita**
   - Prioridade: 1-3 (conforme restrição)
   - Exemplos: BERNARD (só Terça-T), BRUNA (só Quarta-M)

4. **Professores com alta carga horária**
   - Prioridade: 3-5
   - Exemplos: VICTOR (21h), JEFF (19h), ALINEHIS (18h)

5. **Professores normais**
   - Prioridade: 5-10
   - Sem restrições especiais

---

## ✅ Checklist de Validação

Ao gerar uma nova grade, verificar:

- [ ] ❌ **Clonagem:** Nenhum professor em 2 lugares ao mesmo tempo?
- [ ] 🧪 **Labs:** Duplas não conflitam com membros individuais?
- [ ] 🎯 **Alexandre:** 18/18h com aulas geminadas (exceto 1 turma)?
- [ ] 🚫 **Sexta-Tarde:** Bloqueada (ou violações controladas)?
- [ ] 📅 **Horários Vagos:** Turmas têm períodos livres?
- [ ] ⏱️ **Consecutivas:** Máximo 2 seguidas (exceto Lab/JEFF)?
- [ ] 📚 **Carga Horária:** Professores com horas completas?

---

## 💡 Notas Importantes

1. **Regras Invioláveis (Nível 1)** nunca podem ser quebradas
2. **Regras Críticas (Nível 2)** podem ser flexibilizadas para alcançar taxas de sucesso maiores
3. A escolha da variante depende das prioridades da instituição:
   - Rigor máximo? → **Modo Estrito**
   - Melhor taxa de sucesso? → **Variante C**
   - Equilibrio? → **Variante B**

---

*Este documento serve como referência definitiva para todas as restrições do sistema de geração de grade.*
