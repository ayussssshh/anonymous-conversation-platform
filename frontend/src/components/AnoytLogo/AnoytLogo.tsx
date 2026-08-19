import "./AnoytLogo.css"




export default function AnoytLogo() {
  return (
    <svg
      className="anoyt-logo"
      viewBox="0 0 240 80"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Back chat bubble */}
      <path
        d="M30 18
           H67
           C77 18 85 26 85 36
           C85 46 77 54 67 54
           H56
           L62 62
           L48 54
           H30
           C20 54 12 46 12 36
           C12 26 20 18 30 18Z"
        fill="#3b1115"
      />

      {/* Front chat bubble */}
      <path
        d="M25 12
           H62
           C72 12 80 20 80 30
           C80 40 72 48 62 48
           H48
           L53 56
           L39 48
           H25
           C15 48 7 40 7 30
           C7 20 15 12 25 12Z"
        fill="#0a0a0a"
        stroke="#8f1d2c"
        strokeWidth="2.5"
      />

      {/* Dots */}
      <circle cx="29" cy="30" r="3" fill="#8f1d2c" />
      <circle cx="43" cy="30" r="3" fill="#8f1d2c" />
      <circle cx="57" cy="30" r="3" fill="#8f1d2c" />

      {/* Text */}
      <text
        x="98"
        y="48"
        fontFamily="Inter, Arial, sans-serif"
        fontSize="30"
        fontWeight="500"
        letterSpacing="1"
        fill="#eeeeee"
      >
        an
      </text>

      {/* O */}
      <circle
        cx="145"
        cy="39"
        r="10"
        fill="none"
        stroke="#8f1d2c"
        strokeWidth="3"
      />

      {/* yt */}
      <text
        x="160"
        y="48"
        fontFamily="Inter, Arial, sans-serif"
        fontSize="30"
        fontWeight="500"
        letterSpacing="1"
        fill="#eeeeee"
      >
        yt
      </text>
    </svg>
  );
}