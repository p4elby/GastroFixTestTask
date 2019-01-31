from bson import Decimal128


class Details:
    worker = []
    given = Decimal128("0.0")
    get = Decimal128("0.0")

    def __init__(self, detail):
        self.worker = detail['worker']
        self.given = detail['given']
        self.get = detail['get']

    @staticmethod
    def make_details(detail):
        time_detail = []
        count = len(detail)
        for i in range(count):
            time_detail.append(Details(detail[i]))
        return time_detail
