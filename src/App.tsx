import { DragEvent, MouseEvent, useState, useEffect } from 'react';
import './App.css';

interface Widget {
  type: string;
  w: number;
  h: number;
}

interface WidgetBox extends Widget {
  id: number;
  x: number;
  y: number;
}

let index = 1;
let widgetX = 0;
let widgetY = 0;
let widget: Widget | undefined = void 0;
const widgetList: Widget[] = [
  {
    type: 'pie',
    w: 200,
    h: 200,
  },
  {
    type: 'line',
    w: 400,
    h: 200,
  },
  {
    type: 'bar',
    w: 400,
    h: 200,
  },
];

function App() {
  const [list, setList] = useState<WidgetBox[]>([]);
  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    console.log(e.nativeEvent.offsetX, e.nativeEvent.offsetY);

    const _widget = {
      id: index++,
      x: e.nativeEvent.offsetX - widgetX,
      y: e.nativeEvent.offsetY - widgetY,
      ...widget!,
    };
    const arr = [...list];
    arr.push(_widget);
    setList(arr);
  };
  const onMouseDown = (e: MouseEvent<HTMLDivElement>, _widget: Widget) => {
    widgetX = e.nativeEvent.offsetX;
    widgetY = e.nativeEvent.offsetY;
    widget = _widget;
    console.log(widgetX, widgetY);
  };
  useEffect(() => {
    // console.log(list);
  }, [list]);
  return (
    <>
      <div id="app" className="app">
        <div className="widget-list">
          {widgetList.map(item => (
            <div
              key={item.type}
              className="widget"
              draggable="true"
              onMouseDown={e => {
                onMouseDown(e, item);
              }}>
              {item.type}
            </div>
          ))}
        </div>
        <div className="panel" onDragOver={e => e.preventDefault()} onDrop={onDrop}>
          {list.map(item => (
            <div
              className="box"
              key={item.id}
              style={{ transform: `translate(${item.x}px, ${item.y}px)`, width: `${item.w}px`, height: `${item.h}px` }}>
              {item.type}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
