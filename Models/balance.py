from bson import Decimal128


class Balance:
    workerId = ""
    balance = Decimal128("0.0")

    def __init__(self, balance):
        self.workerId = balance['workerId']

    @staticmethod
    def make_balance(balance):
        return Balance(balance)
