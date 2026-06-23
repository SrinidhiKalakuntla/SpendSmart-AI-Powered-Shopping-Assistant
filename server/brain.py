from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# ✅ Allow requests from the React frontend (CRA dev server on :3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dummy database of items
ITEMS = {
    1: {"name": "Laptop", "price": 50000},
    2: {"name": "Smartphone", "price": 20000},
    3: {"name": "Headphones", "price": 1500},
}


# Helper function inside same file
def calculate_discount(price: float, discount_percent: float):
    return price - (price * discount_percent / 100)


@app.get("/")
def read_root():
    return {"message": "Hello World"}


@app.get("/items/{item_id}")
def read_item(item_id: int):
    item = ITEMS.get(item_id, {"name": "Unknown", "price": 0})
    item = dict(item)  # avoid mutating the shared ITEMS dict
    item["discounted_price"] = calculate_discount(item["price"], 10)
    return item


# ✅ New: Chat endpoint used by the React Chatbot component
class ChatRequest(BaseModel):
    message: str


@app.post("/chat")
def chat(req: ChatRequest):
    msg = req.message.strip().lower()

    if not msg:
        return {"response": "Please type a message so I can help you 🙂"}

    # Simple intent matching for demo purposes
    if "price" in msg:
        items_list = ", ".join(
            f"{item['name']} (₹{item['price']})" for item in ITEMS.values()
        )
        return {"response": f"Here are current prices: {items_list}"}

    if "discount" in msg or "offer" in msg:
        item = ITEMS[1]
        discounted = calculate_discount(item["price"], 10)
        return {
            "response": (
                f"We currently have a 10% discount on {item['name']}: "
                f"₹{item['price']} → ₹{discounted:.2f}"
            )
        }

    if "spending" in msg or "budget" in msg:
        return {
            "response": "Check the Budget Tracker page to see your total spending per category."
        }

    if "hello" in msg or "hi" in msg:
        return {"response": "Hello! I'm your shopping assistant. Ask me about prices, offers, or spending."}

    return {
        "response": "I'm not sure about that yet, but I can help with prices, offers, and spending summaries!"
    }
