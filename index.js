let menuOptions;
let battleOptions;
let herosOptions;
let heroClassName = null;

const heroes = [];
const heroesChosed = [];
const heroClasses = {
    mago: {
        heroPower: 10,
        heroDefense: 25,
        heroHealth: 57,
        special_skill: 80
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
            if (heroes.length === 0 && heroesChosed.length === 0) {
                alert("Você não criou/selecionou seu campeão!");
                createHero();
            }
            heroBattle();
            break;

        default:
            console.log("Nenhuma função encontrada");
            break;
    }
} while (menuOptions !== 0)

function createHero() {

    if (heroes.length > 0) {
        alert("Limite máximo de heróis atingido(1)!");
        alert(" O herói atual sera substituído.");
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

        heroes[0] = hero;
        return;
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
        text += `\n=== ${heroClassName.toUpperCase()} ===\n`;
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

        // no segundo for in eu percorro todas as propriedades das classes predefinidas, ou seja, atributos em heroClasses["mago"] = vida, ataque...
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

    heroClassName = chosedClass;

    heroesChosed[0] = heroClasses[chosedClass];

    console.log(chosedClass);

    return chosedClass;
}

function heroOpponent() {

    // variável contendo um array de strings (mago, soldado...)
    const classes = Object.keys(heroClasses);

    // classes[0], classes[1]... classes retorna as chaves do objeto: mago, tanque e etc... 
    // dessa forma usasse o índice para selecionar uma classe aleatória
    const randomclass = classes[Math.floor(Math.random() * classes.length)];

    alert(`Seu oponente será o ${randomclass}!`);

    // retornando dois objetos
    return {
        champion: heroClasses[randomclass], // atributos da variável sorteada
        className: randomclass // nome da variável sorteada
    };
}


function heroBattle() {

    const opponent = heroOpponent();

    const player = heroes[0];


    battleOptions = Number(prompt(
        "1 - Atacar" +
        "\n2 - Defender" +
        "\n3 - Esquivar" +
        "\n4 - Habilidade Especial"
    ));

    switch (battleOptions) {
        case 1:
            // ataque
            opponent.heroDefense = Math.max(0, opponent.heroDefense - player.heroPower);
            alert(`Oponente atingido!
                \nDano causado: ${player.heroPower}
                \nDefesa do oponente: ${opponent.heroDefense}`);
            if (opponent.heroDefense === 0)
                alert("A defesa do oponente foi quebrada!");
            //console.log("A defesa do oponente foi quebrada!");
            break;

        case 2:
            // defender
            // colocar uma condição if, se o ataque do bot for o ataque padrão
            player.heroDefense -= (opponent.heroPower / 2);
            alert(`O ${opponent.className} atacou!
                \nDano causado: ${player.heroDefense}`);
            break;

        case 3:
            // esquivar

            break;

        case 4:
            // habilidade especial

            break;

        default:
            // caso o usuário digite algo que não está nas opções => "Opção inválida"
            break;
    }
}


// for eu sei quantas vezes será necessário executar o código, é definido
// while uma condição de repetição fixa, acontece isso ( expressão ) quando a condição for ( true )
// do while é um laço de repetição, mas nem tão repetição. Assim que sua condição for false, ele encerra sua execução

function opponentAttack() {

    const randomAttack = Math.floor(Math.random() * 2) + 1;

}