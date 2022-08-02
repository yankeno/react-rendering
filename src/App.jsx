import { useState, useCallback, useMemo } from "react";
import { ChildArea } from "./components/ChildArea";
import "./style.css";

export function App() {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);

  const onClickOpen = () => {
    setOpen(!open);
  };

  const onChangeText = (e) => {
    setText(e.target.value);
  }

  /**
   * アロー関数はレンダリングが走るたびに再生成される
   * -> 前回レンダリングとは違うものとして扱われるため、
   *    関数を渡している 子component も再レンダリングが走る
   * -> アロー関数を useCallBack() で囲むことで、第二引数に指定した値が更新された場合のみ
   *    子component の再レンダリングを実行させることができる
   * -> 第二引数を空配列にすることで関数の再生成による 子component の再レンダリングを無効化できる 
  */
  const onClickClose = useCallback(() => {
    setOpen(false);
  }, []);

  /**
   * useMemo で囲むことで変数をメモ化可能
   */
  const temp = useMemo(() => 1+3, []);
  console.log(temp);

  return (
    <div className="App">
      <input value={text} onChange={onChangeText} />
      <br />
      <br />
      <button onClick={onClickOpen}>表示</button>
      <ChildArea open={open} onClickClose={onClickClose} />
    </div>
  )
}
