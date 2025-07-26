import { useState, useCallback, useEffect ,useRef} from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [number, setNum] = useState(false);
  const [char, setChar] = useState(false);
  const [pass, setPass] = useState("");
  const passref=useRef(null)
  // Function to generate password
  const passGenerator = useCallback(() => {
    let p = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (number) str += "0123456789";
    if (char) str += "!@#$%^&*()_+-={}[]|:;\"<>.,?/";

    for (let i = 0; i < length; i++) { 
      let c = Math.floor(Math.random() * str.length);
      p += str.charAt(c);
    }

    setPass(p);
  }, [length, number, char]);

  // Automatically generate password when length, number, or char changes
  useEffect(() => {
    passGenerator();
  }, [length, number, char, passGenerator]); 

  const copyToClipboard = () => {
    if (passref.current) {
      passref.current.select();
      passref.current.setSelectionRange(0, pass.length); // Corrected method
      navigator.clipboard.writeText(pass);
    }
  };
  

  return (
    <div className="main-container">
      <h1 className="h1" style={{color:'white'}}>React.js</h1>
      <div className="password-box">
        <h1 className="display-6 text-center mb-4">Password Generator</h1>

        <div className="input-group mb-3">
        <input 
  type="text"
  className="form-control text-center"
  placeholder="Generated password"
  value={pass}
  ref={passref}  // Attach ref to the input field
  readOnly
/>

          <button className="btn btn-primary" onClick={copyToClipboard}>
            Copy
          </button>
        </div>

        <div className="mb-3">
          <label className="form-label">Password Length: {length}</label>
          <input 
            type="range" 
            className="form-range"
            min="6" 
            max="20" 
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
          />
        </div>

        <div className="form-check">
          <input 
            type="checkbox" 
            className="form-check-input"
            id="numbers"
            checked={number}
            onChange={() => setNum(!number)}
          />
          <label className="form-check-label" htmlFor="numbers">
            Include Numbers
          </label>
        </div>

        <div className="form-check mb-3">
          <input 
            type="checkbox" 
            className="form-check-input"
            id="symbols"
            checked={char}
            onChange={() => setChar(!char)}
          />
          <label className="form-check-label" htmlFor="symbols">
            Include Special Characters
          </label>
        </div>

        <button className="btn btn-primary w-100" onClick={passGenerator}>
          Generate Password
        </button>
      </div>
    </div>
  );
}

export default App;
