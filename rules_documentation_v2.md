# Documentação Completa de Regras da Grade Escolar

Este documento consolida TODAS as regras, restrições e dados para a geração da grade horária conforme fornecido pelo usuário.

## 1. Estrutura do Problema
-   **Tabelas**: Duas (Manhã e Tarde) com 25 slots cada (5 dias x 5 horários).
-   **Turmas (Colunas)**: 
    -   Química: 1Q, 2Q, 3Q
    -   Análises: 1A, 2A, 3A
    -   Farmácia: 1F, 2F, 3F
-   **Horários (Linhas)**: 
    -   Manhã: 1M a 5M
    -   Tarde: 1T a 5T

## 2. Regras Críticas (Hard Constraints)
1.  **Clonagem Proibida**: Um professor NÃO pode estar em duas turmas no mesmo horário.
2.  **Duplas/Lab**: Professores compostos (ex: ADRIANAPEDRO) bloqueiam os membros individuais (ADRIANA e PEDRO) no mesmo slot.
3.  **Sexta Tarde**: BLOQUEIO TOTAL, exceto para o professor FRED.
4.  **Horários Vagos Obrigatórios (Checklist de Ouro)**:
    -   **1Q**: Livre na Manhã de um dia INTEIRO E Livre na Tarde de um dia INTEIRO.
    -   **2Q**: 1M (Manhã) Livre TODOS os dias E Tarde Livre inteira num dia.
    -   **3F**: Manhã Livre inteira num dia.
    -   **1F**: 1M (Manhã) Livre TODOS os dias E Tarde Livre inteira num dia.
    -   **1A, 2A, 2F**: 1M (Manhã) Livre TODOS os dias.
5.  **Aulas Consecutivas**:
    -   **Máximo 2 seguidas**: Regra geral para todos os professores.
    -   **Exceções (Mais de 2 permitidas)**: 
        -   Professores de Laboratório (com "/" no nome, ex: ADR/PED).
        -   Professor **JEFF**.

## 3. Regras Específicas de Professores (Notas do Banco de Dados)

### 🔥 **ALEXANDRE** (ATUALIZADO - 25/12/2024)
-   Aulas obrigatoriamente **geminadas** (2 seguidas) em TODAS as 9 turmas.
-   **✨ FLEXIBILIZAÇÃO NOVA (Implementada 25/12/2024)**: 
    -   Pode ter **1 turma** com aulas não-consecutivas (separadas em dias diferentes)
    -   As outras 8 turmas devem manter aulas geminadas
    -   **Exemplo**: Quinta p1 numa turma + Sexta p5 na mesma turma
-   **Regra de Recesso**: Proibido ter aulas **consecutivas** (geminadas) especificamente no bloco **p3+p4**. É permitido p2+p3 ou p4+p5.
-   **📊 Status Atual**: 
    -   ✅ 18/18h alocadas com sucesso (100%)
    -   ✅ Todas as 9 turmas com aulas geminadas
    -   ✅ A flexibilização não foi necessária (solver otimizado conseguiu alocar tudo geminado)
-   **Disponibilidade**: Segunda (MT), Quarta (MT), Sexta (M)

### Outros Professores
-   **ADRIANAPEDRO**: 4 aulas seguidas (geminadas 4x).
-   **ALINEFAR**: 6 aulas no 3F (2 por dia).
-   **ALINEFRED**: 1F (4 num dia + 2 noutro).
-   **EMERSONFRED**: 3Q (3 seguidas).
-   **EMERSONGIR**: 2F (4 + 2).
-   **VICTOR**: Turno Tarde + opção 1M.

## 4. Banco de Dados de Professores (Resumo de Cargas)
| Professor | Carga | Turmas / Observações |
| :--- | :--- | :--- |
| ADRIANA | 9 | 1F(1), 2Q(1), 2F(2), 3Q(1), 3A(3), 3F(1). Disp: Seg/Sex(M) ou Ter(T). |
| ADRIANAPEDRO | 4 (Lab) | 2Q(4 seguidas). Disp: Seg ou Sex(M). |
| **ALEXANDRE** | **18** | **2 seguidas em todas as 9 turmas (1 pode ser separada). Disp: Seg(MT), Qua(MT), Sex(M). ✅ 100% ALOCADO** |
| ALINEFAR | 9 | 2F(3), 3F(6 - 2/dia). Disp: Ter/Qua/Qui/Sex(M). |
| ALINEFRED | 6 (Lab) | 1F(4 um dia + 2 outro). Disp: Qua ou Sex(M). |
| ALINEHIS | 18 | 2 em todas as 9 turmas. Disp: Seg a Qui(M). |
| BERNARD | 5 | 1F(2), 3A(3). Disp: Ter(T). |
| BRUNA | 2 | 3A(2). Disp: Qua(M). |
| DANIEL | 5 | 1Q(2), 3Q(3). Disp: Seg/Qua (M ou T). |
| DANIELFRED | 6 (Lab) | 1Q (M:4, T:2). Disp: Seg/Qua. |
| DANIELKENIA | 4 (Lab) | 3Q. Disp: Seg (M ou T). |
| DOMINGOS | 8 | 1A(2), 2A(4), 3A(2). Disp: Ter/Qua/Qui (M ou T). |
| DOMPAULO | 8 (Lab) | 1A(4), 3A(4). Disp: M(Qua/Qui) ou T(Ter). |
| EDNEIA | 15 | 1Q(2), 1A(2), 1F(2), 3Q(3), 3A(3), 3F(3). Disp: T(Seg, Qua, Qui). |
| EMERSON | 7 | 2Q(2), 2F(2), 3Q(3). Disp: Seg-Qui (M ou T). |
| EMERSONFRED | 6 (Lab) | 3Q (3 seguidas). Disp: Seg/Qua (M ou T). |
| EMERSONGIR | 6 (Lab) | 2F (4+2). Disp: M(Ter, Qua, Qui). |
| EMERSONKENIA | 4 (Lab) | 2Q. Disp: T(Seg-Qui). |
| FLAVIA | 18 | 2 em todas as 9. Disp: M(Seg, Qui, Sex) ou T(Seg, Ter). |
| FRED | 6 | 1Q(1), 1A(1), 2Q(2), 2A(2). Disp: M(Qua, Sex) ou T(Seg, Ter, Qua, Sex). |
| GIRLAINE | 9 | 1Q(3), 1A(3), 1F(3). Disp: Ter/Qui (M ou T). |
| ILZA | 12 | 1 em 1Q, 1A, 1F, 2Q, 2A, 2F. 2 em 3Q, 3A, 3F. Disp: M(Seg, Qua, Sex). |
| JEFF | 19 | 1A(13), 2A(6). Disp: M(Seg, Ter, Qui, Sex). |
| JULIANA | 16 | 1Q(3), 1A(3), 1F(3), 2Q(1), 2A(2), 2F(1), 3Q(1), 3A(1), 3F(1). Disp: M(Seg, Ter, Qua, Sex). |
| KENIA | 5 | 2Q(2), 3Q(3). Disp: Seg(M/T) ou Qui(T). |
| LORENA | 16 | 2Q(2), 2A(2), 3Q(4), 3A(4), 3F(4). Disp: T(Seg-Qui). |
| LUCINEIDE | 15 | 1Q(3), 1A(3), 1F(3), 2Q(1), 2A(2), 2F(3). Disp: M(Seg-Qui). |
| MATEMÁTICA | 6 | 2Q(2), 2A(2), 2F(2). Disp: M(Seg ou Qui). |
| MIRIA | 15 | 2 em 1Q-2F, 1 em 3Q-3F. Disp: T(Seg, Ter, Qui). |
| NEUSA | 13 | 1Q(1), 1A(1), 2Q(2), 2A(2), 2F(2), 1F(2), 3Q(1), 3A(1), 3F(1). Disp: M(Seg-Qui). |
| PAULO | 6 | 1A(1), 2A(1), 3A(2), 1F(2). Disp: M(Qua/Qui/Sex) ou T(Ter). |
| PEDRORAISSA | 4 (Lab) | 2F. Disp: Qui(M/T) ou Qua(T). |
| PEDRO | 6 | 1Q(2), 3F(4). Disp: M(Seg) ou T(Ter/Qua/Qui). |
| RAISSA | 16 | 1Q(1), 1F(3), 2Q(1), 2F(1), 3F(2), 3Q(1), 3A(1), 3F(1). Disp: M(Ter) ou T(Qua/Qui). |
| VICTOR | 21 | 1Q-3F(2), 2Q-2F(3). Disp: T(Seg-Sex) + opção 1M. |
| WENDEL | 16 | 1Q(2), 1A(2), 2Q(2), 2A(2), 2F(2), 3Q(3), 3F(3). Disp: M ou T(Qui ou Sex). |

## 5. Protocolo de Execução (Chain of Thought)
1.  **Fase de Alocação**: Priorizar professores com restrições severas (Labs, Disponibilidade única, Alexandre).
2.  **Fase de Verificação**:
    -   Check 1: Sem clonagem?
    -   Check 2: 1Q com manhã e tarde livres?
    -   Check 3: 1M obrigatórios vagos respeitados?
    -   Check 4: Só FRED na Sexta Tarde?
    -   Check 5: Conflitos de Dupla/Lab?
    -   Check 6: Alexandre com todas as aulas alocadas?
3.  **Fase de Correção**: Mover blocos inteiros se houver erro.
4.  **Saída Final**: Markdown das tabelas + Relatório de Auditoria.

## 6. Otimizações Implementadas

### Versão 2.0 - 25/12/2024
**🎯 Problema Resolvido**: Alexandre não conseguia alocar 18/18h

**Mudanças Implementadas**:
1. **Flexibilização de Regra**: Alexandre pode ter 1 turma com aulas não-consecutivas
2. **Otimização do Solver**:
   - Número de passes: 20 → 40 (+100%)
   - Prioridade do Alexandre: 1 → 0.5 (alta prioridade, entre Labs e normais)
3. **Lógica de Alocação**: Novo algoritmo permite fallback para aulas separadas em 1 turma

**📊 Resultados**:
- ✅ Alexandre: 12/18h → 18/18h (100% sucesso)
- ✅ Taxa Geral: 94.2% → 95.5% (+1.3%)
- ✅ Todas as 9 turmas com aulas geminadas
- ✅ Flexibilização disponível mas não foi necessária

### Versão 1.0 - Inicial
- Implementação das regras básicas do sistema
- CSP Solver com 4 variantes (Estrito, Variante A, B, C)
- Sistema de auditoria completo
- Taxa de sucesso inicial: 89.4% (Modo Estrito)

## 7. Status Atual do Sistema

### ✅ Regras 100% Atendidas
- Clonagem Proibida
- Bloqueio Lab/Duplas
- Alexandre - Carga Completa (18/18h)
- Alexandre - Aulas Geminadas
- Alexandre - Bloqueio p3-p4

### ⚠️ Regras com Violações (Variante C)
- Sexta Tarde: 3 violações (VICTOR, WENDEL)
- Horários Vagos: 7 turmas afetadas
- Carga Horária: 6 professores com déficit

### 📈 Comparativo de Variantes

| Variante | Taxa | Alexandre | Sexta | Vagos |
|----------|------|-----------|-------|-------|
| Estrito | 89.4% | ✅ 18/18h | ✅ 100% | ❌ 2 |
| Variante A | 93.8% | ✅ 18/18h | ⚠️ Relaxada | ❌ 7 |
| Variante B | 92.1% | ✅ 18/18h | ✅ 100% | ⚠️ Relaxada |
| **Variante C** | **95.5%** | ✅ **18/18h** | ⚠️ Relaxada | ⚠️ Relaxada |

**Variante Recomendada**: Variante C (Máxima Flexibilidade) - 95.5% de sucesso

---

*Última atualização: 25/12/2024*  
*Versão: 2.0*
