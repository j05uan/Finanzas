CREATE DATABASE myWallet;
USE myWallet;

-- Tabla Usuarios
CREATE TABLE Usuarios (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    contraseña VARCHAR(255),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla Presupuesto
CREATE TABLE Presupuesto (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    ingreso_mensual DECIMAL(10, 2),
    FOREIGN KEY (user_id) REFERENCES Usuarios(user_id)
);

-- Tabla Tipo de Gasto
CREATE TABLE TipoGasto (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50)
);

-- Tabla Gastos
CREATE TABLE Gastos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_tipo_gasto INT,
    nombre_gasto VARCHAR(100),
    valor DECIMAL(10, 2),
    FOREIGN KEY (id_tipo_gasto) REFERENCES TipoGasto(id)
);

-- Tabla Tarjeta de Crédito
CREATE TABLE TarjetaCredito (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    tipo_tarjeta ENUM('VISA', 'MasterCard', 'AMEX') NOT NULL,
    nombre VARCHAR(50),
    saldo DECIMAL(10, 2),
    fecha_corte DATE,
    valor_corte DECIMAL(10, 2),
    total_deuda DECIMAL(10, 2),
    interes DECIMAL(5, 2),
    valor_intereses DECIMAL(10, 2),
    cuota_manejo DECIMAL(10, 2),
    costos_adicionales DECIMAL(10, 2),
    FOREIGN KEY (user_id) REFERENCES Usuarios(user_id)
);

-- Tabla Tarjeta de Débito
CREATE TABLE TarjetaDebito (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    tipo_tarjeta ENUM('VISA', 'MasterCard') NOT NULL,
    nombre VARCHAR(50),
    saldo DECIMAL(10, 2),
    fecha_vencimiento DATE,
    cuota_manejo DECIMAL(10, 2),
    FOREIGN KEY (user_id) REFERENCES Usuarios(user_id)
);

-- Tabla Efectivo
CREATE TABLE Efectivo (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    nombre VARCHAR(100),
    saldo DECIMAL(10, 2),
    es_ingreso_mensual BOOLEAN,
    FOREIGN KEY (user_id) REFERENCES Usuarios(user_id)
);

-- Tabla Saldo Efectivo
CREATE TABLE SaldoEfectivo (
    id INT PRIMARY KEY AUTO_INCREMENT,
    saldo_total DECIMAL(10, 2),
    id_presupuesto INT,
    id_efectivo INT,
    actualizacion DATE,
    FOREIGN KEY (id_presupuesto) REFERENCES Presupuesto(id),
    FOREIGN KEY (id_efectivo) REFERENCES Efectivo(id)
);

-- Tabla Saldo Tarjeta de Débito
CREATE TABLE SaldoTarjetaDebito (
    id INT PRIMARY KEY AUTO_INCREMENT,
    saldo_total DECIMAL(10, 2),
    id_presupuesto INT,
    id_tarjeta_debito INT,
    actualizacion DATE,
    FOREIGN KEY (id_presupuesto) REFERENCES Presupuesto(id),
    FOREIGN KEY (id_tarjeta_debito) REFERENCES TarjetaDebito(id)
);

-- Tabla Saldo Tarjeta de Crédito
CREATE TABLE SaldoTarjetaCredito (
    id INT PRIMARY KEY AUTO_INCREMENT,
    saldo_total DECIMAL(10, 2),
    id_presupuesto INT,
    id_tarjeta_credito INT,
    actualizacion DATE,
    FOREIGN KEY (id_presupuesto) REFERENCES Presupuesto(id),
    FOREIGN KEY (id_tarjeta_credito) REFERENCES TarjetaCredito(id)
);

-- Tabla Transacciones
CREATE TABLE Transacciones (
    transaccion_id INT PRIMARY KEY AUTO_INCREMENT,
    cuenta_id INT,
    user_id INT,
    monto DECIMAL(10, 2),
    fecha_transaccion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tipo_transaccion ENUM('ingreso', 'gasto', 'transferencia') NOT NULL,
    categoria_id INT,
    descripcion VARCHAR(255),
    FOREIGN KEY (cuenta_id) REFERENCES Usuarios(user_id), -- Suponiendo que las cuentas están asociadas a usuarios
    FOREIGN KEY (categoria_id) REFERENCES TipoGasto(id)
);

-- Tabla Objetivos Financieros
CREATE TABLE Objetivos (
    objetivo_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    nombre_objetivo VARCHAR(100),
    monto_objetivo DECIMAL(10, 2),
    monto_actual DECIMAL(10, 2) DEFAULT 0,
    fecha_objetivo DATE,
    FOREIGN KEY (user_id) REFERENCES Usuarios(user_id)
);
