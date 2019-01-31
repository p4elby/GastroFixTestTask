class Diner:
    title = ''
    date = 0.0
    details = []

    def __init__(self, diner):
        self.title = diner['title']
        self.date = diner['date']
        self.details = diner['details']

    @staticmethod
    def make_diner(diner):
        return Diner(diner)
