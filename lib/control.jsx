import ReactDOM from "react-dom";
import { MapControl, withLeaflet } from "react-leaflet";
import { Control, DomUtil, DomEvent } from "leaflet";

const DumbControl = Control.extend({
  options: {
    className: "",
    onOff: "",
    handleOff: function noop() {}
  },

  onAdd(/* map */) {
    var _controlDiv = DomUtil.create("div", this.options.className);
    DomEvent.disableClickPropagation(_controlDiv);
    this.setState({'container': this.leafletElement.getContainer()});
    return _controlDiv;
  },

  onRemove(map) {
    if (this.options.onOff) {
      map.off(this.options.onOff, this.options.handleOff, this);
    }

    return this;
  }
});

export default withLeaflet(
  class LeafletControl extends MapControl {
    createLeafletElement(props) {
      return new DumbControl(Object.assign({}, props));
    }

    render() {
      console.log(this.leafletElement);
      if (!this.leafletElement || !this.state.container) {
        return null;
      }
      return ReactDOM.createPortal(
        this.props.children,
        this.state.container
      );
    }
  }
);
