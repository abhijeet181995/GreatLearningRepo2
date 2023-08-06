import Button from "../component/Button";

export const renderUniversityFn = (actionText, handleItemAction) => (item) => {
  const { name, place, image } = item;
  return (
    <div key={name} className="p-1 border flex h-full justify-between">
      <div className="flex">
        <img alt="logo" src={image} className="border p-2 w-10 h-10" />
        <div className="p-1 h-full justify-start">
          <div>{name}</div>
          <div className="text-sm text-gray-500">{place}</div>
        </div>
      </div>
      <div className="h-full ">
        <Button outline success onClick={() => handleItemAction(item)}>
          {actionText}
        </Button>
      </div>
    </div>
  );
};
