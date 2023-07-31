import Svg, { Path, G, Defs, ClipPath } from "react-native-svg"

    const MapPinSVG = (props) => (
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width={17}
          height={17}
          fill="none"
          {...props}
        >
          <G
            stroke="#191919"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.257}
            clipPath="url(#a)"
          >
            <Path d="M8.75 16.244s6.188-4.046 6.188-8.766a6.01 6.01 0 0 0-1.813-4.29A6.25 6.25 0 0 0 8.75 1.41a6.25 6.25 0 0 0-4.375 1.777 6.01 6.01 0 0 0-1.813 4.291c0 4.72 6.188 8.766 6.188 8.766Z" />
            <Path d="M8.748 9.501c1.14 0 2.063-.905 2.063-2.023 0-1.117-.924-2.022-2.063-2.022-1.139 0-2.062.905-2.062 2.022 0 1.118.923 2.023 2.062 2.023Z" />
          </G>
          <Defs>
            <ClipPath id="a">
              <Path fill="#fff" d="M.5.736H17v16.183H.5z" />
            </ClipPath>
          </Defs>
        </Svg>
)
export default MapPinSVG
