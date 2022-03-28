function InfoBar(props) {
  const { SectionName } = props;
  return (
    <div className="d-flex justify-content-between mt-3">
      <div className="p-2 bd-highlight">
        <h3>Welcome back!</h3>
      </div>
      <div className="p-2 bd-highlight">
        <h3 className="">{SectionName}</h3>
      </div>
      <div></div>
    </div>
  );
}

export default InfoBar;
