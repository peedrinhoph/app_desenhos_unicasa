import styled from 'styled-components';

export const Loading = styled.ActivityIndicator.attrs({
    size: 'large',
    color: 'rgba(39,174,96, 0.6)',
  })`
  margin: 80% 0;
  `;
//flexDirection: row;
//row             Alinhe os filhos da esquerda para a direita. Se o agrupamento estiver ativado, a próxima linha começará sob o primeiro item à esquerda do contêiner.
//column( valor padrão ) Alinhar filhos de cima para baixo. Se o agrupamento estiver ativado, a próxima linha começará no primeiro item esquerdo na parte superior do contêiner.
//row-reverse     Alinhe os filhos da direita para a esquerda. Se o empacotamento estiver ativado, a próxima linha começará sob o primeiro item à direita do contêiner.
//column-reverse  Alinhe os filhos de baixo para cima. Se o agrupamento estiver ativado, a próxima linha começará no primeiro item esquerdo na parte inferior do contêiner.


//justifyContent: space-around;
//flex-start( valor padrão ) Alinhe os filhos de um contêiner ao início do eixo principal do contêiner.
//flex-end      Alinhe os filhos de um contêiner no final do eixo principal do contêiner.
//center        Alinhe os filhos de um contêiner no centro do eixo principal do contêiner.
//space-between Espaço uniforme das crianças no eixo principal do contêiner, distribuindo o espaço restante entre as crianças.
//space-around  Espaço uniforme das crianças no eixo principal do contêiner, distribuindo o espaço restante ao redor das crianças. Comparado ao space-betweenuso space-around, o espaço será distribuído para o início do primeiro filho e o fim do último filho.
//space-evenly  Distribuído uniformemente dentro do contêiner de alinhamento ao longo do eixo principal. O espaçamento entre cada par de itens adjacentes, a borda inicial principal e o primeiro item, e a borda final principal e o último item, são exatamente iguais.

//alignItems: center;
//stretch( valor padrão ) Estique os filhos de um contêiner para corresponder ao heighteixo transversal do contêiner.
//flex-start  Alinhe os filhos de um contêiner ao início do eixo transversal do contêiner.
//flex-end    Alinhe os filhos de um contêiner ao final do eixo transversal do contêiner.
//center      Alinhe os filhos de um contêiner no centro do eixo transversal do contêiner.
//baseline    Alinhe os filhos de um contêiner ao longo de uma linha de base comum. Os filhos individuais podem ser definidos como a linha de base de referência para seus pais.

//alignSelf: center
//alignSelftem as mesmas opções e efeitos, alignItemsmas, em vez de afetar os filhos em um contêiner, 
//você pode aplicar essa propriedade a um único filho para alterar seu alinhamento no pai. 
//alignSelfsubstitui qualquer opção definida pelo pai com alignItems.

//alignContent: center;
//alignContent define a distribuição de linhas ao longo do eixo transversal. Isso só tem efeito quando itens são agrupados em várias linhas usando flexWrap.
//flex-start( valor padrão ) Alinhe as linhas quebradas ao início do eixo transversal do contêiner.
//flex-end        Alinhe as linhas quebradas no final do eixo transversal do contêiner.
//stretch         linhas quebradas para coincidir com a altura do eixo transversal do contêiner.
//center          Alinhe as linhas quebradas no centro do eixo transversal do contêiner.
//space-between   Espace as linhas uniformemente ao longo do eixo principal do contêiner, distribuindo o espaço restante entre as linhas.
//space-around    Espace as linhas uniformemente ao longo do eixo principal do contêiner, distribuindo o espaço restante ao redor das linhas. Comparado ao espaço entre o uso do espaço ao redor, o espaço será distribuído no início das primeiras linhas e no final da última linha.

//flexWrap: wrap; ou nowrap
//A flexWrappropriedade é definida em contêineres e controla o que acontece quando os filhos excedem o tamanho do contêiner ao 
//longo do eixo principal. Por padrão, os filhos são forçados a uma única linha (que pode reduzir elementos). 
//Se o agrupamento for permitido, os itens serão agrupados em várias linhas ao longo do eixo principal, se necessário.