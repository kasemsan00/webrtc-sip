export default function CameraConfig() {
  return (
    <div>
      <section id="constraints">
        <div id="getUserMedia">
          <div className="input">
            <h2>Camera constraints</h2>
            <div id="minWidth">
              <label>
                Min width <span>300</span>px:
              </label>
              <input type="range" min="0" max="4096" value="300" />
            </div>
            <div id="maxWidth">
              <label>
                Max width <span>640</span>px:
              </label>
              <input type="range" min="0" max="4096" value="640" />
            </div>
            <div id="minHeight">
              <label>
                Min height <span>200</span>px:
              </label>
              <input type="range" min="0" max="2160" value="200" />
            </div>
            <div id="maxHeight">
              <label>
                Max height <span>480</span>px:
              </label>
              <input type="range" min="0" max="2160" value="480" />
            </div>
            <div id="minFramerate">
              <label>
                Min frameRate <span>0</span>fps:
              </label>
              <input type="range" min="0" max="60" value="0" />
            </div>
            <div id="maxFramerate">
              <label>
                Max frameRate <span>0</span>fps:
              </label>
              <input type="range" min="0" max="60" value="0" />
            </div>
          </div>
          <div id="getUserMediaConstraints" className="output"></div>
        </div>
      </section>
      <button>Preview</button>
    </div>
  );
}
