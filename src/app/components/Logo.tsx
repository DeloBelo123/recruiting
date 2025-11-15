interface LogoProps {
    size?: "small" | "medium" | "large" | "xlarge";
    showWordmark?: boolean;
  }
  
  export function Logo({ 
    size = "medium", 
    showWordmark = true 
  }: LogoProps) {
    const sizeConfig = {
      small: {
        width: 52,
        height: 36,
        fontSize: "1rem",
        wordmarkSize: "text-sm",
        gap: "gap-1",
        radius: "0.75rem",
      },
      medium: {
        width: 72,
        height: 48,
        fontSize: "1.8rem",
        wordmarkSize: "text-base",
        gap: "gap-1.5",
        radius: "1rem",
      },
      large: {
        width: 104,
        height: 68,
        fontSize: "2.2rem",
        wordmarkSize: "text-xl",
        gap: "gap-2",
        radius: "1.4rem",
      },
      xlarge: {
        width: 156,
        height: 100,
        fontSize: "3.2rem",
        wordmarkSize: "text-2xl",
        gap: "gap-2.5",
        radius: "2rem",
      },
    };
  
    const config = sizeConfig[size];
  
    return (
      <div className={`flex items-center ${config.gap}`}>
        {/* Letters with Gradient */}
        <div 
          className="relative flex items-center justify-center"
          style={{
            width: config.width,
            height: config.height,
          }}
        >
          {/* Letters */}
          <div 
            className="flex items-center justify-center tracking-tight select-none"
            style={{ 
              fontSize: config.fontSize,
              fontWeight: 700,
              background: 'linear-gradient(to right, rgb(142, 65, 239), rgba(168, 85, 247, 0.8))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            <span>R</span>
            <span>V</span>
            <span>A</span>
          </div>
        </div>
  
        {/* Wordmark */}
        {showWordmark && (
          <div className="flex flex-col leading-tight">
            <span className={`${config.wordmarkSize}`} style={{ fontWeight: 600, color: 'rgb(142, 65, 239)' }}>
              RecruitVoiceAI
            </span>
            <span className={`text-muted-foreground`} style={{ fontSize: '0.75em', fontWeight: 400 }}>
              AI-Powered Recruiting
            </span>
          </div>
        )}
      </div>
    );
  }