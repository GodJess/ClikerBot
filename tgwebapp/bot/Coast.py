class PriceTabLevel:
    def __init__(self):
        self.prices = {
            1: 1000,
            2: 2500,
            3: 4000,
            4: 8000,
            5: 16000,
            6: 32000,
            7: 50000,
            8: 100000,
            9: 250000,
            10: 500000
        }

    def get_price(self, level):
        return self.prices.get(level, "Max")
    
class PriceStorageLevel:
    def __init__(self):
        self.prices = {
            1: 2500,
            2: 5000,
            3: 8000,
            4: 16000,
            5: 32000,
            6: 50000,
            7: 100000,
            8: 250000,
            9: 500000,
            10: 1000000
        }

    def get_price(self, level):
        return self.prices.get(level, "Max")
    
class PriceRecoverLevel:
    def __init__(self):
        self.prices = {
            1: 1000,
            2: 2500,
            3: 5000,
            4: 10000,
            5: "Max",
        }

    def get_price(self, level):
        return self.prices.get(level, "Max")
    
class PriceClikerLevel:
    def __init__(self):
        self.prices = {
            0: 25000
        }

    def get_price(self, level):
        return self.prices.get(level, "Max")
    
class RatingPoint:
    def __init__(self):
        self.point={
            "Silver": 1000000,
            "Gold": 4000000,
            "Platina": 10000000,
            "Diamond": 10000002
        }
    def getPoint(self, points):
        return self.point.get(points, "None")