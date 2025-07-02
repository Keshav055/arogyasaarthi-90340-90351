import React from "react";

/**
 * PUBLIC_INTERFACE
 * Minimal placeholder for DragAndDropSortable:
 * Just renders children in order with no reordering support.
 * Replace with a real drag-and-drop implementation (e.g. react-beautiful-dnd) for production.
 */
export default function DragAndDropSortable({ items, setItems, direction = "horizontal", renderItem }) {
  return (
    <div style={{
      display: direction === "vertical" ? "block" : "flex",
      gap: 10
    }}>
      {items.map((item, idx) => renderItem(item, idx))}
    </div>
  );
}
