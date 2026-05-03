from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import auth, transactions, upload, alerts, graph, dashboard
import uvicorn

app = FastAPI(title="AML Detection System", version="1.0.0")

origins = [
    "https://aml-shield-smoky.vercel.app",
    "https://aml-shield.vercel.app",
    "http://localhost:3000",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(upload.router, prefix="/api/upload", tags=["upload"])
app.include_router(transactions.router, prefix="/api/transactions", tags=["transactions"])
app.include_router(alerts.router, prefix="/api/alerts", tags=["alerts"])
app.include_router(graph.router, prefix="/api/graph", tags=["graph"])
app.include_router(dashboard.router, prefix="/api/dashboard", tags=["dashboard"])

@app.get("/")
def root():
    return {"message": "AML Detection System API"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
