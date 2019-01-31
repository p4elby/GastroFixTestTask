class Worker:
    name = ""

    def __init__(self, worker):
        self.name = worker['name']

    @staticmethod
    def make_worker(worker):
        return Worker(worker)
