from controler import app, socketIo


if __name__ == "__main__":
    socketIo.run(app, allow_unsafe_werkzeug=True)
