let option;
const heroes = [];
const heroClasses = {
    mago: {
        heroPower: 10,
        heroDefense: 25,
        heroHealth: 57,
        mana: 89,
        spell: 80
    },

    tanque: {
        heroPower: 28,
        heroDefense: 95,
        heroHealth: 74,
        shield: 120
    },

    soldado: {
        heroPower: 48,
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

    vagabundo: {
        heroPower: 1,
        heroDefense: 1,
        heroHealth: 1,

    },

    necromante: {
        heroPower: 30,
        heroDefense: 19,
        heroHealth: 44,
        revive: true
    }
};

alert("Bem vindo a arena dos campões!");

do {

    option = Number(prompt(
        "1 - Criar campeão " +
        "\n2 - Listar campeões" +
        "\n3 - Batalhar" +
        "\n0 - Sair"
    ));

    if (option === 1) {
        createHero();
    } else if (option === 2) {
        console.log(showClasses());
        heroesList();
    } else if (option === 3) {
        //função batalhar
    }

} while (option !== 0);

function createHero() {

    const hero = {
        heroName: prompt("Nome do herói: "),
        heroPower: Number(prompt("Força do herói: ")),
        heroDefense: Number(prompt("Defesa do herói: ")),
        heroHealth: Number(prompt("Vida do herói: "))
    };

    const atributosDisponiveis = 150
    if (hero.heroPower + hero.heroDefense + hero.heroHealth > atributosDisponiveis) {
        alert("Atributos inválidos! Você tem apenas 150 pontos de atributos");
        createHero();
    }

    heroes.push(hero);

    return heroes;
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

function showClasses() {
    let text = "";

    for (const classe in heroClasses) {
        text += `\n=== ${classe.toUpperCase()}===\n`;

        for (const atributo in heroClasses[classe]) {
            text += `${atributo}: ${heroClasses[classe][atributo]}\n`;
        }
    }

    console.log(text);
}