type HashtagProps = {
  selectedCompany: string;
  setSelectedCompany: React.Dispatch<React.SetStateAction<string>>;
};

const companies = ["ByteGrad", "Nike", "McDonald's", "Amazon", "Microsoft"];

export default function HashtagList({
  selectedCompany,
  setSelectedCompany,
}: HashtagProps) {
  function Button({ company }: { company: string }) {
    return (
      <button
        style={{
          transform:
            selectedCompany === company
              ? "translateY(-2px) translateZ(0) scale(1.07)"
              : "none",
          color: selectedCompany === company ? "#ffffff" : "#cbcbcb",
        }}
        onClick={() => onClick(company)}
      >
        {"#" + company}
      </button>
    );
  }
  function onClick(company: string) {
    if (selectedCompany === company) {
      setSelectedCompany("");
    } else {
      setSelectedCompany(company);
    }
  }
  return (
    <ul className="hashtags">
      {companies.map((company) => (
        <li>
          <Button company={company} />
        </li>
      ))}
    </ul>
  );
}
