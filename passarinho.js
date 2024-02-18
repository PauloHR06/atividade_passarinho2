// Configuração do jogo Phaser
const config = {
    type: Phaser.AUTO,  // Define o tipo de renderização automática
    parent: "game",     // Elemento HTML pai onde o jogo será inserido
    width: 800,         // Largura do jogo
    height: 600,        // Altura do jogo
    scene: {            // Definição das cenas do jogo
        preload: preload,   // Função de pré-carregamento de recursos
        create: create,     // Função de criação de objetos e elementos
        update: update      // Função de atualização do jogo (loop principal)
    }
};

// Inicialização do jogo Phaser com as configurações fornecidas
const game = new Phaser.Game(config);

// Declaração de variáveis globais
let passaro;    // Objeto sprite representando o pássaro

// Função de pré-carregamento de recursos
function preload() {
    // Carrega a imagem de fundo e a sprite do pássaro
    this.load.image("background", "assets/bg_azul-claro.jpg");
    this.load.spritesheet("passaro", "assets/bird-green.png", {frameWidth: 75, frameHeight: 75});
}

// Função de criação de objetos e elementos
function create() {
    // Adiciona a imagem de fundo na cena e ajusta sua escala
    this.add.image(400, 300, "background").setScale(1.2);
    
    // Cria uma animação chamada "fly" para a sprite do pássaro
    this.anims.create({
        key: "fly",                                     // Nome da animação
        frameRate: 7,                                   // Taxa de quadros por segundo
        frames: this.anims.generateFrameNumbers("passaro", { start: 0, end: 7}),  // Gera os quadros da animação
        repeat: Infinity                                // Repete infinitamente
    });

    // Adiciona o sprite do pássaro na cena, ajusta sua posição e escala, e inicia a animação
    passaro = this.add.sprite(100, 300, "passaro").setScale(1.5);
    passaro.play("fly");
}

// Função de atualização do jogo (loop principal)
function update() {
    // EIXO X
    // Verifica se o pássaro está na posição inicial
    if (passaro.x === 100) {
        passaro.setFlip(false, false); // Define a orientação do sprite do pássaro para a direita
        passaro.ida = true;             // Define uma propriedade personalizada indicando que o pássaro está indo para a direita
    } else if (passaro.x === 700) {
        passaro.setFlip(true, false);  // Define a orientação do sprite do pássaro para a esquerda
        passaro.ida = false;            // Define uma propriedade personalizada indicando que o pássaro está indo para a esquerda
    }
    // Movimentação horizontal do pássaro
    if (passaro.x < 700 && passaro.ida == true) {
        passaro.x += 5;     // Move o pássaro para a direita
    } else if (passaro.x > 100 && passaro.ida == false) {
        passaro.x -= 5;     // Move o pássaro para a esquerda
    }

    // EIXO Y
    // Verifica se o pássaro está na posição de subida ou descida
    if (passaro.y === 300){
        passaro.subida = true; // Pássaro sobe
    } else if (passaro.y === 100) {
        passaro.subida = false; // Pássaro desce
    }
    if (passaro.subida == true && passaro.y > 100) {
        passaro.y -= 5; 
    } else if (passaro.subida == false) {
        passaro.y += 5;
    }

};