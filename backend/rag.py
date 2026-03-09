from langchain_community.document_loaders import TextLoader
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings

loader = TextLoader("../data/company.txt")
docs = loader.load()

embeddings = HuggingFaceEmbeddings()

db = Chroma.from_documents(docs, embeddings)

def search_docs(query):
    results = db.similarity_search(query)
    return results[0].page_content