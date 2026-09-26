from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_root():
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "online"


def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}


def test_financial_health():
    response = client.get("/api/v1/financial-health")
    assert response.status_code == 200
    data = response.json()
    assert "income" in data
    assert "spending" in data
    assert "savings" in data


def test_copilot_query():
    response = client.post(
        "/api/v1/copilot/query",
        json={"question": "Can I buy a watch for ₹8,000?"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["intent"] == "affordability"
    assert "answer" in data
