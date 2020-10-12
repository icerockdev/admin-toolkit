import React, { useMemo } from 'react';
import { useFeature } from '../../../../../../utils/hooks';
import classNames from 'classnames';
import styles from './styles.module.scss';
import { observer } from 'mobx-react';
import { Placeholder } from '../../common/Placeholder';
var FeatureReadTitle = observer(function () {
    var feature = useFeature();
    var title = useMemo(function () { return feature.getItemTitle(feature.data.read); }, [
        feature.data.read,
    ]);
    return (React.createElement("div", { className: classNames(styles.title, 'feature-read__title') }, feature.data.isLoading ? (React.createElement("h1", null,
        React.createElement(Placeholder, null))) : (title && React.createElement("h1", null, title))));
});
export { FeatureReadTitle };
