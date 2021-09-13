import React, { useState, useRef } from "react";
import styled from "styled-components";

const PvmCounterForm = () => {
  //hooks
  //local state
  const [sumaSuPvm, setSumaSuPvm] = useState(0);
  const [sumeBePvm, setSumeBePvm] = useState(0);
  const [pvm, setPvm] = useState(0);
  const [pvmProcentas, setPvmProcentas] = useState(21);

  // refs
  const sumWithPvmInputref = useRef();
  const sumWithoutPvmInputRef = useRef();

  // -- C U S T O M  F U N C T I O N S

  // BE pvm ivestis
  const handleSumWithoutPvmChange = () => {
    setSumeBePvm(+sumWithoutPvmInputRef.current.value);
    setSumaSuPvm(
      (
        +sumWithoutPvmInputRef.current.value * (pvmProcentas / 100) +
        +sumWithoutPvmInputRef.current.value
      ).toFixed(2)
    );
    setPvm(
      (sumWithoutPvmInputRef.current.value * (pvmProcentas / 100)).toFixed(2)
    );
  };

  // SU pvm ivestis
  const handleSumWithPvmChange = () => {
    setSumaSuPvm(+sumWithPvmInputref.current.value);
    setSumeBePvm(
      (sumWithPvmInputref.current.value / ((pvmProcentas + 100) / 100)).toFixed(
        2
      )
    );
    setPvm(
      (
        sumWithPvmInputref.current.value -
        sumWithPvmInputref.current.value / ((pvmProcentas + 100) / 100)
      ).toFixed(2)
    );
  };

  //PVM select'ai
  const handlePvmPercentChange = (e) => {
    setPvmProcentas(+e.target.value);
    setSumaSuPvm(0);
    setSumeBePvm(0);
    setPvm(0);
  };

  return (
    <section>
      <form>
        <select
          name="vat_percent"
          id="vat_percent"
          value={pvmProcentas}
          onChange={(e) => handlePvmPercentChange(e)}
        >
          <option value="21">21%</option>
          <option value="9">9%</option>
          <option value="5">5%</option>
        </select>
        <div className="control-group">
          <label>Suma (be PVM)</label>
          <input
            type="text"
            name="amount_wo_vat"
            id="amount_wo_vat"
            value={sumeBePvm}
            onChange={handleSumWithoutPvmChange}
            ref={sumWithoutPvmInputRef}
          />
        </div>
        <div className="control-group">
          <label>PVM suma</label>
          <input
            type="text"
            name="vat_amount"
            id="vat_amount"
            value={pvm}
            disabled="disabled"
          />
        </div>
        <div className="control-group">
          <label>Bendra suma (su PVM)</label>
          <input
            type="text"
            name="total_amount"
            id="total_amount"
            value={sumaSuPvm}
            onChange={handleSumWithPvmChange}
            ref={sumWithPvmInputref}
          />
        </div>
      </form>
    </section>
  );
};

export default PvmCounterForm;
