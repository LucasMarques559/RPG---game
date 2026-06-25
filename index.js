let menuOptions;
let battleOptions;
let herosOptions;

const heroes = [];
const heroesChosed = [];
const heroClasses = {
    mago: {
        heroPower: 10,
        heroDefense: 25,
        heroHealth: 57,
        mana: 89,
        spell: 80
    },

    tanque: {
        heroPower: 20,
        heroDefense: 95,
        heroHealth: 74,
        shield: 120
    },

    soldado: {
        heroPower: 27,
        heroDefense: 35,
        heroHealth: 55,
        vigor: 60
    },

    assassino: {
        heroPower: 11,
        heroDefense: 14,
        heroHealth: 20,
        furtividade: 250
    },

    miseravel: {
        heroPower: 1,
        heroDefense: 1,
        heroHealth: 1,
        skill: "???"
    },

    necromante: {
        heroPower: 16,
        heroDefense: 19,
        heroHealth: 44,
        revive: true
    }
};

alert("Bem-vindo a arena dos campeões!");

do {

    menuOptions = Number(prompt(
        "1 - Criar campeão " +
        "\n2 - Listar campeões" +
        "\n3 - Escolher campeão" +
        "\n4 - Batalhar"
    ));

    switch (menuOptions) {
        case 1:
            createHero();
            break;

        case 2:
            showClasses();
            heroesList();
            listHeroesChosed();
            break;

        case 3:
            choseChampion();
            break;

        case 4:
            if (heroes.length === 0) {
                alert("Você ainda não criou/escolheu seu herói!");
                createHero();
            }
            heroOpponent();
            break;

        default:
            console.log("Nenhuma função encontrada");
            break;
    }
} while (menuOptions !== 0)

function createHero() {

    if (heroes.length === 3) {
        alert("Limite máximo de heróis atingido(3)!");
        return;
    }

    while (true) {

        alert("Você tem 150 pontos de atributos para uso!");

        const hero = {
            heroName: prompt("Nome do herói: "),
            heroPower: Number(prompt("Força do herói: ")),
            heroDefense: Number(prompt("Defesa do herói: ")),
            heroHealth: Number(prompt("Vida do herói: "))
        };

        if (hero.heroName === "") {
            alert("Você não informou um nome para seu herói!");
            continue;
        }

        const atributosDoHeroi =
            hero.heroPower +
            hero.heroDefense +
            hero.heroHealth;

        if (atributosDoHeroi > 150) {
            alert("Atributos inválidos! Você tem apenas 150 pontos de atributos");
            continue;
        }

        if (
            Number.isNaN(hero.heroHealth) ||
            Number.isNaN(hero.heroPower) ||
            Number.isNaN(hero.heroDefense)
        ) {
            alert("Insira apenas números nos atributos!");
            continue;
        }

        heroes.push(hero);
        return heroes;
    }
}

function heroesList() {
    for (let i = 0; i < heroes.length; i++) {
        alert(
            `Nome: ${heroes[i].heroName}
            \nVida: ${heroes[i].heroHealth}
            \nForça: ${heroes[i].heroPower}
            \nDefesa: ${heroes[i].heroDefense}`
        );
    }
}

function listHeroesChosed() {
    let text = "";

    for (const classe in heroesChosed) {
        text += `\n=== ${classe.toUpperCase()} ===\n`;
        for (const atributo in heroesChosed[classe]) {
            text += `${atributo}: ${heroesChosed[classe][atributo]}\n`
        }
    }

    alert(text);
}

// quando a propriedade está armazenada em uma variável, é necessário chamar por colchetes heros[exe]
// let pessoa = {nome = "lucas"};
// let chave = "nome";
// console.log(pessoa[chave])
function showClasses() {
    let text = "";

    // for in percorre as propriedades de um objeto
    // classe recebe todas as classes de heróis = mago, tanque, soldado...
    for (const classe in heroClasses) {

        // armazeno essas classes dentro da variável text
        text += `\n=== ${classe.toUpperCase()} ===\n`;

        // no segundo for in eu percorro todas as propriedades das classes, ou seja, atributos em heroClasses["mago"] = vida, ataque...
        // ${atributo} -> vida: ${heroClasses[classe][atributo] -> 100
        for (const atributo in heroClasses[classe]) {
            text += `${atributo}: ${heroClasses[classe][atributo]}\n`;
        }
    }

    console.log(text);
}

function choseChampion() {

    // tem duas formas de obter as propriedades de um objeto
    // for in e object.keys

    alert("Só é permitido selecionar 1 campeão!");

    const classes = Object.keys(heroClasses);

    let menu = "";

    for (let i = 0; i < classes.length; i++) {
        menu += `${i + 1} - ${classes[i]}\n`;
    }

    const option = Number(prompt(menu));

    const chosedClass = classes[option - 1];

    heroesChosed[0] = heroClasses[chosedClass];

    console.log(chosedClass);
}

function heroOpponent() {

    const classes = Object.keys(heroClasses);

    // classes[0], classes[1]... classes retorna as chaves do objeto: mago, tanque e etc... 
    // dessa forma usasse o índice para selecionar uma classe aleatória
    const randomclass = classes[Math.floor(Math.random() * classes.length)];

    const champion = heroClasses[randomclass];

    alert(`Seu oponente será o ${randomclass}!`);

    battleOptions = Number(prompt(
        "1 - Atacar" +
        "\n2 - Defender" +
        "\n3 - Esquivar" +
        "\n0 - Habilidade Especial"
    ));
}

switch (battleOptions) {
    case 1:
        // Quando eu escolher atacar, quero que a vida do bot diminua de acordo com o meu dano
        // variavel da vida do bot
        // subtrair com a minha força
        // atualizar a variavel para esse valor final ( vida - minhaForça )
        champion.heroHealth -= heroes[0].heroPower;
        break;

    case 2:
        // Se eu escolher defender na hora certa, ou seja, se eu defender na mesma hora que o bot escolher atacar = metade do dano
        heroes[0].heroDefense -= (champion.heroPower / 2);
        break;

    // case 3:
    //     // Esquivar seria como o "rolar" dos soulslike, fico imune ao ataque (mas apenas aos ataques padrões, habilidades não são possíveis esquivar)
    //     // Mesma lógica, se eu esquivar na hora certa = anula o ataque
    //     // Função de ataque do bot -> if(option === 3) heroPower = null

    case 0:
        alert("É necessário escolher uma das classes heróicas!");
        break;

    default:
        console.log("Nenhuma função encontrada");
        break;
}

// for eu sei quantas vezes será necessário executar o código, é definido
// while uma condição de repetição fixa, acontece isso ( expressão ) quando a condição for ( true )
// do while é um laço de repetição, mas nem tão repetição. Assim que sua condição for false, ele encerra sua execução

function opponentAttack() {

    const randomAttack = Math.floor(Math.random() * 2) + 1;

}