import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};
const PropagateLoader = () => {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");
    return (_jsxs("div", { className: "sweet-loading", children: [_jsx("button", { onClick: () => setLoading(!loading), children: "Toggle Loader" }), _jsx("input", { value: color, onChange: (input) => setColor(input.target.value), placeholder: "Color of the loader" }), _jsx(ClipLoader, { color: color, loading: loading, cssOverride: override, size: 150, "aria-label": "Loading Spinner", "data-testid": "loader" })] }));
};
export default PropagateLoader;
