import "./SortForm.css";

function SortForm() {
  return (
    <div className="form-group">
      <div className="form-row">
        <p>Categories</p>
        <select className="select-form">
          <option value="all">all</option>
          <option value="art">art</option>
          <option value="biography">biography</option>
          <option value="computers">computers</option>
          <option value="history">history</option>
          <option value="medical">medical</option>
          <option value="poetry">poetry</option>
        </select>
      </div>
      <div className="form-row">
        <p>Sorting by</p>
        <select className="select-form">
          <option value="relevance">relevance</option>
          <option value="newest">newest</option>
        </select>
      </div>
    </div>
  )
}

export default SortForm
