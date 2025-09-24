import logging
from binance.client import Client
from binance.exceptions import BinanceAPIException
import sys

# ---------------- Logging Setup ---------------- #
logging.basicConfig(
    filename="trading_bot.log",
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

# ---------------- Trading Bot Class ---------------- #
class BasicBot:
    def __init__(self, api_key, api_secret, testnet=True):
        """Initialize Binance Futures Client"""
        self.client = Client(api_key, api_secret, testnet=testnet)
        if testnet:
            self.client.FUTURES_URL = "https://testnet.binancefuture.com"
        logging.info("Trading Bot Initialized in %s mode", "Testnet" if testnet else "Live")

    def place_market_order(self, symbol, side, quantity):
        """Place a Market Order"""
        try:
            order = self.client.futures_create_order(
                symbol=symbol,
                side=side,
                type="MARKET",
                quantity=quantity
            )
            logging.info("Market Order Success: %s", order)
            return order
        except BinanceAPIException as e:
            logging.error("Market Order Failed: %s", e.message)
            return {"error": str(e)}

    def place_limit_order(self, symbol, side, quantity, price):
        """Place a Limit Order"""
        try:
            order = self.client.futures_create_order(
                symbol=symbol,
                side=side,
                type="LIMIT",
                timeInForce="GTC",
                quantity=quantity,
                price=price
            )
            logging.info("Limit Order Success: %s", order)
            return order
        except BinanceAPIException as e:
            logging.error("Limit Order Failed: %s", e.message)
            return {"error": str(e)}


# ---------------- Command Line Interface ---------------- #
def main():
    print("===== Simplified Binance Futures Trading Bot =====")

    api_key = input("Enter your Binance Testnet API Key: ").strip()
    api_secret = input("Enter your Binance Testnet API Secret: ").strip()

    bot = BasicBot(api_key, api_secret, testnet=True)

    while True:
        print("\nOptions:")
        print("1. Place Market Order")
        print("2. Place Limit Order")
        print("3. Exit")

        choice = input("Select option (1/2/3): ").strip()

        if choice == "1":
            symbol = input("Enter trading pair (e.g., BTCUSDT): ").upper()
            side = input("Enter side (BUY/SELL): ").upper()
            quantity = input("Enter quantity: ").strip()
            result = bot.place_market_order(symbol, side, float(quantity))
            print("Response:", result)

        elif choice == "2":
            symbol = input("Enter trading pair (e.g., BTCUSDT): ").upper()
            side = input("Enter side (BUY/SELL): ").upper()
            quantity = input("Enter quantity: ").strip()
            price = input("Enter limit price: ").strip()
            result = bot.place_limit_order(symbol, side, float(quantity), price)
            print("Response:", result)

        elif choice == "3":
            print("Exiting bot... Goodbye!")
            sys.exit()

        else:
            print("Invalid option! Try again.")


if __name__ == "__main__":
    main()
