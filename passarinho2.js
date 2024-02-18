// Configuração do jogo Phaser.
const config = {
    type: Phaser.AUTO, // Define o tipo de renderização (WebGL ou Canvas).
    parent: "game", // Define o elemento HTML onde o jogo será renderizado.
    width: 800, // Define a largura do jogo.
    height: 600, // Define a altura do jogo.
    scene: { // Define as funções de cena (preload, create, update).
        preload: preload, // Carrega os recursos do jogo.
        create: create, // Configura os elementos do jogo quando ele é criado.
        update: update // Atualiza a lógica do jogo a cada quadro.
    }
};

// Cria uma instância do jogo Phaser com as configurações fornecidas.
const game = new Phaser.Game(config);

// Declaração de variáveis globais.
let passaro; // Variável para armazenar o sprite do pássaro.
let sprite; // Variável para armazenar o sprite.

// Função preload, onde os recursos do jogo são carregados antes de começar o jogo.
function preload () {
    // Carrega a imagem de fundo e o spritesheet do pássaro.
    this.load.image("background", "assets/bg_azul-claro.jpg");
    this.load.spritesheet("passaro", "assets/bird-green.png", {frameWidth: 75, frameHeight: 75});
}

// Função create, onde os elementos do jogo são configurados quando o jogo é criado.
function create () {
    // Adiciona a imagem de fundo ao jogo e a escala para ajustar ao tamanho da janela.
    this.add.image(400, 300, "background").setScale(1.2);
    
    // Cria uma animação chamada "fly" para o sprite do pássaro.
    this.anims.create({
        key: "fly", // Nome da animação.
        frameRate: 7, // Taxa de quadros por segundo.
        frames: this.anims.generateFrameNumbers("passaro", { start: 0, end: 7}), // Gera os números dos quadros para a animação.
        repeat: Infinity // Define que a animação deve repetir infinitamente.
    });

    // Adiciona o sprite do pássaro ao jogo e escala para ajustar ao tamanho desejado.
    passaro = this.add.sprite(400, 300, "passaro").setScale(1.5);
    passaro.play("fly"); // Inicia a animação do pássaro.
}

// Função update, onde a lógica do jogo é atualizada a cada quadro.
function update () {
    const cursors = this.input.keyboard.createCursorKeys(); // Obtém as teclas do teclado pressionadas.
    
    // Movimentação do pássaro com as setas direcionais.
    if (cursors.left.isDown) {
        passaro.x -= 5; // Move o pássaro para a esquerda.
        passaro.setFlip(true, false); // Inverte o sprite horizontalmente.
    } else if (cursors.right.isDown) {
        passaro.x += 5; // Move o pássaro para a direita.
        passaro.setFlip(false, false); // Retorna o sprite à sua orientação original.
    }

    if (cursors.up.isDown) {
        passaro.y -= 5; // Move o pássaro para cima.
    } else if (cursors.down.isDown) {
        passaro.y += 5; // Move o pássaro para baixo.
    }
    
    // Limites do ambiente do jogo na horizontal.
    if (passaro.x >= 800) {
        passaro.x -= 5; // Se o pássaro ultrapassar o limite direito, move-o de volta para dentro do ambiente.
    } else if (passaro.x <= 0) {
        passaro.x += 5; // Se o pássaro ultrapassar o limite esquerdo, move-o de volta para dentro do ambiente.
    }
    
    // Limites do ambiente do jogo na vertical.
    if (passaro.y >= 600) {
        passaro.y -= 5; // Se o pássaro ultrapassar o limite inferior, move-o de volta para dentro do ambiente.
    } else if (passaro.y <= 0) {
        passaro.y += 5; // Se o pássaro ultrapassar o limite superior, move-o de volta para dentro do ambiente.
    }
}
