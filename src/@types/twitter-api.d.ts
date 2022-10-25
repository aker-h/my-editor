interface Color {
    lightBlue (): void;
    lightGreen (): void;
    orange(): void;
    pink (): void;
    purple (): void;
    yellow (): void;
}

interface Theme {
    black (): void;
    darkBlue (): void;
    light (): void;
}

interface ExApi {
    color: Color;
    theme: Theme;
    asset: {
        install(): void
    }
}