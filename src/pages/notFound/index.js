import React from "react";
import "./style.scss";

export default function NotFound() {
  return (
    <>
      <div id="main" className="not-found">
        <div className="_container">
          <div className="not-found-block">
            <div className="not-found-block-item">
              <div className="not-found-404">
                <h1>404</h1>
                <div>
                  <p>страница не найдено</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
