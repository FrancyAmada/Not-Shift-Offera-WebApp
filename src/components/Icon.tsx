import React from 'react';
import { Svg, Path } from 'react-native-svg';

import Icons from '@/constants/Icons';

type IconProps = {
    name: string;
    size?: number;
    stroke?: string;
    strokeWidth?: number;
    color?: string;
};

const Icon = ({ name, size = 32, strokeWidth, stroke, color }: IconProps) => {
    return (
        <Svg height={size} width={size} viewBox="0 0 32 32">
            <Path
                d={Icons[name as keyof typeof Icons]}
                fill={color}
                stroke={stroke}
                strokeWidth={strokeWidth}
            />
        </Svg>
    );
};

export default Icon;
