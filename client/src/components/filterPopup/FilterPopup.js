import React, { useState } from "react";
import "./FilterPopup.scss";

const FilterPopup = () => {
    const [showModal, setShowModal] = useState(false);
    const [filters, setFilters] = useState({ keyword: "", category: "" });
    const [appliedFilters, setAppliedFilters] = useState(null);

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleApplyFilters = () => {
        setAppliedFilters(filters);
        setShowModal(false);
    };

    return (
        <div className="filter-popup-wrapper">
            <button className="open-btn" onClick={() => setShowModal(true)}>
                Open Filter Popup
            </button>

            {showModal && (
                <div className="modal-backdrop">
                    <div className="modal-content">
                        <h2>Filter Options</h2>

                        <input
                            type="text"
                            name="keyword"
                            placeholder="Keyword"
                            value={filters.keyword}
                            onChange={handleChange}
                        />

                        <select name="category" value={filters.category} onChange={handleChange}>
                            <option value="">Select Category</option>
                            <option value="tech">Tech</option>
                            <option value="design">Design</option>
                        </select>

                        <div className="modal-buttons">
                            <button className="cancel-btn" onClick={() => setShowModal(false)}>
                                Cancel
                            </button>
                            <button className="apply-btn" onClick={handleApplyFilters}>
                                Apply
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {appliedFilters && (
                <div className="applied-filters">
                    <h3>Applied Filters:</h3>
                    <p><strong>Keyword:</strong> {appliedFilters.keyword}</p>
                    <p><strong>Category:</strong> {appliedFilters.category}</p>
                </div>
            )}
        </div>
    );
};

export default FilterPopup;
