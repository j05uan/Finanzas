
usuarios = [
      {
        "user_id": "1",
        "nombre": "Juan Pérez",
        "email": "juan.perez@example.com",
        "telefono":"+57 3129090890",
        "role":"usuario",
        "contraseña":"A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ=",
        "fecha_registro": "2024-01-15 12:34:56"
      },
      {
        "user_id": "2",
        "nombre": "María Gómez",
        "email": "maria.gomez@example.com",
        "telefono":"+57 3129189092",
        "role":"usuario",
        "contraseña":"A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ=",
        "fecha_registro": "2024-02-10 14:20:00"
      },
      {
        "user_id":"3",
        "nombre": "Estefany Rueda",
        "email":"estefany@example.com",
        "telefono":"+57 3007890983",
        "role":"admin",
        "contraseña":"A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ=",
        "fecha_registro": "2024-09-10 14:20:00"
      },
      {
        "user_id":"4",
        "nombre": "Juan López",
        "email":"juanpablo@example.com",
        "telefono":"+57 3182589714",
        "role":"admin",
        "contraseña":"A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ=",
        "fecha_registro": "2024-09-10 14:20:00"
      }
    ],
presupuestos = [
      {
        "id": "1",
        "user_id": "1",
        "ingreso_mensual": 3000.00
      },
      {
        "id": "2",
        "user_id": "2",
        "ingreso_mensual": 4000.00
      }
    ],
tipoGasto= [
      {
        "id": "1",
        "nombre": "Vivienda"
      },
      {
        "id": "2",
        "nombre": "Alimentacion"
      },
      {
        "id": "3",
        "nombre": "Transporte"
      },
      {
        "id": "4",
        "nombre":"Salud"
      },
      {
        "id":"5",
        "nombre":"Educacion"
      },
      {
        "id":"6",
        "nombre":"Finanzas e inversiones"
      },
      {
        "id":"7",
        "nomnbre":"Gastos Personales o Familiares"
      },
      {
        "id":"8",
        "nombre":"Ocio"
      },
      {
        "id":"9",
        "nombre":"otros"
      }
    ],
gastos= [
      {
        "id": "1",
        "id_tipo_gasto": "1",
        "nombre_gasto": "Pago de Alquiler",
        "valor": 1200.00
      },
      {
        "id": "2",
        "id_tipo_gasto": "2",
        "nombre_gasto": "Supermercado",
        "valor": 300.00
      }
    ],
tarjetaCredito= [
      {
        "id": "1",
        "user_id": "1",
        "tipo_tarjeta": "VISA",
        "nombre": "Tarjeta Visa Platinum",
        "saldo": 500.00,
        "fecha_corte": "2024-10-15",
        "valor_corte": 1500.00,
        "total_deuda": 2000.00,
        "interes": 1.5,
        "valor_intereses": 30.00,
        "cuota_manejo": 10.00,
        "costos_adicionales": 5.00
      }
    ],
tarjetaDebito= [
      {
        "id": "1",
        "user_id": "2",
        "tipo_tarjeta": "MasterCard",
        "nombre": "Tarjeta Débito MasterCard",
        "saldo": 1000.00,
        "fecha_vencimiento": "2025-05-20",
        "cuota_manejo": 5.00
      }
    ],
efectivo= [
      {
        "id": "1",
        "user_id": "1",
        "nombre": "Efectivo en Cartera",
        "saldo": 200.00,
        "es_ingreso_mensual": true
      }
    ],
saldoEfectivo= [
      {
        "id": "1",
        "saldo_total": 200.00,
        "id_presupuesto": "1",
        "id_efectivo": "1",
        "actualizacion": "2024-10-01"
      }
    ],
saldoTarjetaDebito= [
      {
        "id": "1",
        "saldo_total": 1000.00,
        "id_presupuesto": "2",
        "id_tarjeta_debito": "1",
        "actualizacion": "2024-10-05"
      }
    ],
saldoTarjetaCredito= [
      {
        "id": "1",
        "saldo_total": 500.00,
        "id_presupuesto": "1",
        "id_tarjeta_credito": "1",
        "actualizacion": "2024-10-10"
      }
    ],
transacciones= [
      {
        "transaccion_id": "1",
        "cuenta_id": "1",
        "user_id": "1",
        "monto": 100.00,
        "fecha_transaccion": "2024-10-08 09:30:00",
        "tipo_transaccion": "gasto",
        "categoria_id": "1",
        "descripcion": "Pago de renta mensual"
      },
      {
        "transaccion_id": "2",
        "cuenta_id": "2",
        "user_id": "2",
        "monto": 200.00,
        "fecha_transaccion": "2024-10-09 10:00:00",
        "tipo_transaccion": "ingreso",
        "categoria_id": "2",
        "descripcion": "Sueldo mensual"
      }
    ],
objetivos= [
      {
        "objetivo_id": "1",
        "user_id": "1",
        "nombre_objetivo": "Vacaciones",
        "monto_objetivo": 1500.00,
        "monto_actual": 500.00,
        "fecha_objetivo": "2024-12-31"
      }
    ]

  