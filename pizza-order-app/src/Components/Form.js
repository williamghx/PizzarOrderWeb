import styled from 'styled-components';

const TextCell = ({id, width, label, value, onChange, required, warning=""}) => {
    return (
        <div className={`form-group col-10 col-lg-${width} max-auto mb-3`}>
            <StyledLabel htmlFor={id}>
                {label} {required ? "*" : ""} <span style={{color: "red"}}>{warning}</span>
            </StyledLabel>
            <input 
                id={id}
                name={id}
                className="form-control"
                value={value}
                placeholder={label}
                type="text"
                onChange={onChange}
            />
        </div>
    );
};

const SelectCell = ({ id, width, label, value, options, onChange, required, warning="" }) => {
    return (
        <div className={`col-10 col-lg-${width} max-auto mb-3`}>
            <div className="form-group">
                {<StyledLabel htmlFor={id}>{label} {required ? "*" : ""} <span style={{color: "red"}}>{warning}</span></StyledLabel>}
                <select
                    id={id}
                    name={id}
                    className={`form-select ${value==="none"?"select-placeholder":""}`}
                    value={value}
                    onChange={onChange}
                >
                    <option value="" hidden>{label}</option>
                    {options.map(o =>
                        <option value={o.value}>{o.label}</option>
                    )}
                </select>
            </div>
        </div>
    );
};

const SubmitCell = ({width, text}) => {
    return (
        <>
            <div className={`col-10 col-lg-${(12 - width) / 2} max-auto mb-3`}></div>
            <div className={`col-10 col-lg-${width} max-auto mb-3`}>
                <input type="submit" className="btn btn-success" value={text} />
            </div>
            <div className={`col-10 col-lg-${(12 - width) / 2} max-auto mb-3`}></div>
        </>
    );
};

const StyledLabel = styled.label`
    margin-top: 10px;
    margin-bottom: 20px;
    font-weight:600;
`;

export {TextCell, SelectCell, SubmitCell};