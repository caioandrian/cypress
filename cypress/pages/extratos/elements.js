export const ELEMENTS = {
    EXTRATO: {
        LINHAS: '.list-group > li',
        FN_XP_BUSCA_ELEMENTO: (desc, valor) => `//span[contains(., '${desc}')]//following-sibling::small[contains(., '${valor}')]`,
        FN_XP_REMOVER_ELEMENTO: (desc) => `//span[contains(., '${desc}')]/../../..//i[@class='far fa-trash-alt']`,
        FN_XP_EDITAR_ELEMENTO: (desc) => `//span[contains(., '${desc}')]/../../..//i[@class='fas fa-edit']`
    },
}
