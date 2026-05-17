import { useState } from "react";
import axios from "axios";

function App() {

  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [image, setImage] = useState(null);

  // TEXT ANALYSIS
  const analyzeText = async () => {

    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/analyze-text",
        {
          text: text
        }
      );

      setResult(response.data);

    } catch (error) {

      console.log(error);

      alert("Backend connection failed");
    }
  };

  // IMAGE ANALYSIS
  const analyzeImage = async () => {

    const formData = new FormData();

    formData.append("file", image);

    const response = await axios.post(
      "http://127.0.0.1:8000/analyze-image",
      formData
    );

    setResult(response.data);
  };


  return (

  <div
    style={{
      background: "#020617",
      minHeight: "100vh",
      color: "white",
      padding: "40px",
      fontFamily: "Arial"
    }}
  >

    {/* HEADER */}

    <div style={{ textAlign: "center" }}>

      <h1
        style={{
          fontSize: "64px",
          color: "#38bdf8",
          textShadow: "0px 0px 20px #38bdf8",
          marginBottom: "10px"
        }}
      >
        TruthLens
      </h1>

      <p
        style={{
          color: "#94a3b8",
          fontSize: "18px"
        }}
      >
        Multimodal AI Authenticity Analyzer
      </p>

    </div>

    {/* INPUT SECTION */}

    <div
      style={{
        background: "#0f172a",
        padding: "30px",
        borderRadius: "20px",
        marginTop: "40px"
      }}
    >

      <textarea
        rows="8"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste tweet, LinkedIn post, article..."
        style={{
          width: "100%",
          padding: "15px",
          borderRadius: "12px",
          fontSize: "16px",
          border: "none",
          outline: "none",
          background: "#1e293b",
          color: "white"
        }}
      />

      <button
        onClick={analyzeText}
        style={{
          marginTop: "20px",
          padding: "14px 28px",
          borderRadius: "12px",
          border: "none",
          cursor: "pointer",
          background: "#38bdf8",
          color: "black",
          fontWeight: "bold",
          fontSize: "16px"
        }}
      >
        Analyze Text
      </button>

      {/* IMAGE */}

      <div style={{ marginTop: "30px" }}>

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button
          onClick={analyzeImage}
          style={{
            marginLeft: "10px",
            padding: "14px 28px",
            borderRadius: "12px",
            border: "none",
            cursor: "pointer",
            background: "#22c55e",
            color: "black",
            fontWeight: "bold"
          }}
        >
          Analyze Image
        </button>

      </div>

    </div>

    {/* RESULT SECTION */}

    {

      result && (

        <div
          style={{
            background: "#0f172a",
            marginTop: "40px",
            padding: "30px",
            borderRadius: "20px",
            boxShadow: "0px 0px 20px rgba(56,189,248,0.2)"
          }}
        >

          <h2
            style={{
              marginBottom: "30px",
              color: "#38bdf8"
            }}
          >
            Analysis Result
          </h2>

          {/* HUMANITY */}

          <p>
            <strong>Humanity Score:</strong>
            {" "}
            {result.humanity_score}%
          </p>

          <div
            style={{
              background: "#334155",
              height: "12px",
              borderRadius: "10px",
              overflow: "hidden",
              marginTop: "8px",
              marginBottom: "20px"
            }}
          >
            <div
              style={{
                width: `${result.humanity_score}%`,
                background: "#22c55e",
                height: "100%"
              }}
            ></div>
          </div>

          {/* AI PROBABILITY */}

          <p>
            <strong>AI Probability:</strong>
            {" "}
            {result.ai_probability}%
          </p>

          <div
            style={{
              background: "#334155",
              height: "12px",
              borderRadius: "10px",
              overflow: "hidden",
              marginTop: "8px",
              marginBottom: "20px"
            }}
          >
            <div
              style={{
                width: `${result.ai_probability}%`,
                background: "#ef4444",
                height: "100%"
              }}
            ></div>
          </div>

          {/* MANIPULATION */}

          <p>
            <strong>Manipulation Score:</strong>
            {" "}
            {result.manipulation_score}%
          </p>

          <div
            style={{
              background: "#334155",
              height: "12px",
              borderRadius: "10px",
              overflow: "hidden",
              marginTop: "8px",
              marginBottom: "20px"
            }}
          >
            <div
              style={{
                width: `${result.manipulation_score}%`,
                background: "#eab308",
                height: "100%"
              }}
            ></div>
          </div>

          {/* EXPLANATION */}

          <div
            style={{
              background: "#1e293b",
              padding: "20px",
              borderRadius: "15px",
              marginTop: "25px"
            }}
          >

            <h3 style={{ color: "#38bdf8" }}>
              Authenticity Report
            </h3>

            <p>
              {result.explanation}
            </p>

          </div>

          {

            result.extracted_text && (

              <div
                style={{
                  background: "#1e293b",
                  padding: "20px",
                  borderRadius: "15px",
                  marginTop: "25px"
                }}
              >

                <h3 style={{ color: "#22c55e" }}>
                  Extracted Text
                </h3>

                <p>
                  {result.extracted_text}
                </p>

              </div>

            )

          }

        </div>

      )

    }

  </div>
);
}

export default App;

  