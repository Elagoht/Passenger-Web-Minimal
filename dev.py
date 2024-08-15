from app import app
from time import sleep
from threading import Thread
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
from utilities.prepare import prepare_static_files


class SourceObserver(FileSystemEventHandler):
    def on_modified(self, event):
        print("Source files modified")
        prepare_static_files()

    def on_created(self, event):
        print("Source files created")
        prepare_static_files()


def run_flask():
    app.run(debug=True, use_reloader=False)


def run_observer():
    event_handler = SourceObserver()
    observer = Observer()
    observer.schedule(event_handler, path="src", recursive=True)
    observer.start()

    try:
        while True:
            sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()


if __name__ == "__main__":
    flask_thread = Thread(target=run_flask)
    observer_thread = Thread(target=run_observer)

    flask_thread.start()
    observer_thread.start()

    flask_thread.join()
    observer_thread.join()
