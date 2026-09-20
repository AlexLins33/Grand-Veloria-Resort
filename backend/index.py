import mysql.connector
from flask import Flask, jsonify, request
from flask_cors import CORS
from werkzeug.security import check_password_hash, generate_password_hash

app = Flask(__name__)
# Habilitado para permitir requisições cross-origin do frontend estático
CORS(app)


@app.route("/")
def home():
    return "Servidor do Grand Veloria rodando perfeitamente!"


def conectar_banco():
    return mysql.connector.connect(
        host="127.0.0.1", user="root", password="", database="grand_veloria"
    )


@app.route("/api/cadastro", methods=["POST"])
def cadastro():
    dados = request.json
    nome = dados.get("nome")
    email = dados.get("email")
    senha = dados.get("senha")

    if not nome or not email or not senha:
        return jsonify({"sucesso": False, "mensagem": "Preencha todos os campos."}), 400

    try:
        # O hash previne o armazenamento de senhas em texto plano no banco de dados
        senha_hash = generate_password_hash(senha)

        conexao = conectar_banco()
        cursor = conexao.cursor()

        sql = "INSERT INTO usuarios (nome, email, senha) VALUES (%s, %s, %s)"
        cursor.execute(sql, (nome, email, senha_hash))

        conexao.commit()
        cursor.close()
        conexao.close()

        return jsonify({"sucesso": True, "mensagem": "Conta criada com sucesso!"}), 201

    except mysql.connector.IntegrityError:
        return jsonify(
            {"sucesso": False, "mensagem": "Este e-mail já está cadastrado."}
        ), 409
    except Exception as e:
        return jsonify(
            {"sucesso": False, "mensagem": f"Erro no servidor: {str(e)}"}
        ), 500


@app.route("/api/login", methods=["POST"])
def login():
    dados = request.json
    email = dados.get("email")
    senha_digitada = dados.get("senha")

    conexao = conectar_banco()
    cursor = conexao.cursor(dictionary=True)

    # A busca foca apenas no e-mail para delegar a verificação de segurança ao check_password_hash
    cursor.execute(
        "SELECT id, nome, email, senha FROM usuarios WHERE email = %s", (email,)
    )
    usuario = cursor.fetchone()

    cursor.close()
    conexao.close()

    if usuario and check_password_hash(usuario["senha"], senha_digitada):
        # Removido para impedir o tráfego do hash da senha na resposta da API
        del usuario["senha"]
        return jsonify(
            {"sucesso": True, "mensagem": "Login aprovado", "usuario": usuario}
        ), 200
    else:
        return jsonify(
            {"sucesso": False, "mensagem": "E-mail ou senha incorretos"}
        ), 401


@app.route("/api/recuperar-senha", methods=["POST"])
def recuperar_senha():
    dados = request.json
    email = dados.get("email")
    nova_senha = dados.get("senha")

    conexao = conectar_banco()
    cursor = conexao.cursor(dictionary=True)

    cursor.execute("SELECT id FROM usuarios WHERE email = %s", (email,))
    usuario = cursor.fetchone()

    if usuario:
        senha_hash = generate_password_hash(nova_senha)

        cursor.execute(
            "UPDATE usuarios SET senha = %s WHERE email = %s", (senha_hash, email)
        )
        conexao.commit()

        cursor.close()
        conexao.close()
        return jsonify(
            {"sucesso": True, "mensagem": "Senha atualizada com sucesso!"}
        ), 200
    else:
        cursor.close()
        conexao.close()
        return jsonify(
            {
                "sucesso": False,
                "mensagem": "Este e-mail não foi encontrado em nosso sistema.",
            }
        ), 404


@app.route("/api/checkout", methods=["POST"])
def fazer_reserva():
    dados = request.json
    usuario_id = dados.get("usuario_id")
    quarto = dados.get("quarto")
    checkin = dados.get("checkin")
    checkout = dados.get("checkout")
    hospedes = dados.get("hospedes")
    preco = dados.get("preco")

    if not all([usuario_id, quarto, checkin, checkout, hospedes, preco]):
        return jsonify(
            {"sucesso": False, "mensagem": "Dados da reserva incompletos."}
        ), 400

    try:
        conexao = conectar_banco()
        cursor = conexao.cursor()

        sql = """
            INSERT INTO reservas (usuario_id, quarto, checkin, checkout, hospedes, preco) 
            VALUES (%s, %s, %s, %s, %s, %s)
        """
        cursor.execute(sql, (usuario_id, quarto, checkin, checkout, hospedes, preco))
        conexao.commit()

        cursor.close()
        conexao.close()

        return jsonify(
            {"sucesso": True, "mensagem": "Reserva confirmada com sucesso!"}
        ), 201

    except Exception as e:
        return jsonify(
            {"sucesso": False, "mensagem": f"Erro ao processar reserva: {str(e)}"}
        ), 500


# Bloco de inicialização posicionado no final para garantir o mapeamento de todas as rotas
if __name__ == "__main__":
    app.run(debug=True, port=5000)
