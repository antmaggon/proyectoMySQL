
-- Tabla organizaciones
CREATE TABLE IF NOT EXISTS organizaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Tabla paises
CREATE TABLE IF NOT EXISTS paises (
    id INT AUTO_INCREMENT PRIMARY KEY,
    organizacion_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    image VARCHAR(255),
    description TEXT,
    FOREIGN KEY (organizacion_id) REFERENCES organizaciones(id) ON DELETE CASCADE
);

-- Tabla vehiculos
CREATE TABLE IF NOT EXISTS vehiculos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pais_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    imagen VARCHAR(255),
    FOREIGN KEY (pais_id) REFERENCES paises(id) ON DELETE CASCADE
);


INSERT INTO organizaciones VALUES (1, 'OTAN');
INSERT INTO organizaciones VALUES (2, 'BRICS');

INSERT INTO paises VALUES (1, 1, 'Alemania', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/2560px-Flag_of_Germany.svg.png', 'Tecnología avanzada y precisión industrial');
INSERT INTO paises VALUES (2, 1, 'Inglaterra', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Flag_of_England.svg/2560px-Flag_of_England.svg.png', 'Historia imperial de piratas');
INSERT INTO paises VALUES (3, 2, 'Rusia', 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Flag_of_Russia.png', 'Territorio vasto con poder estratégico');
INSERT INTO paises VALUES (4, 2, 'China', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/2560px-Flag_of_the_People%27s_Republic_of_China.svg.png', 'Potencia milenaria con influencia global');

INSERT INTO vehiculos VALUES (1, 1, 'Leopard2a7', 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Leopard_2_A7.JPG');
INSERT INTO vehiculos VALUES (2, 2, 'Challenger 3', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Challenger_2-Megatron_MOD_45161557.jpg/330px-Challenger_2-Megatron_MOD_45161557.jpg');
INSERT INTO vehiculos VALUES (3, 3, 'T90', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/T90-0010.jpg/1024px-T90-0010.jpg');
INSERT INTO vehiculos VALUES (4, 4, 'Type96', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/TankBiathlon2017Individual-02.jpg/1024px-TankBiathlon2017Individual-02.jpg');