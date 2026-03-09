from fastapi import FastAPI
from pydantic import BaseModel
from rag import search_docs
import ollama
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Question(BaseModel):
    query: str


@app.post("/ask")
def ask_question(q: Question):

    context = search_docs(q.query)

    prompt = f"""
You are an AI assistant for Navdrishti Insurance.

Use the information below to answer the question.

Context:
{context}

Question:
{q.query}

Instructions:
- Give SHORT bullet points
- Maximum 5 bullets
- DO NOT say phrases like "Answer:" or "The answer is"
- Start directly with the information
- Be concise and professional
"""

    response = ollama.chat(
        model="gemma3:4b",
        messages=[
            {"role": "user", "content": prompt}
        ]
    )

    answer = response["message"]["content"]

    return {"answer": answer}