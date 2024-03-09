module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      temple_id: { type: Number, required: true },
      name: { type: String, required: true },
      location: String,
      dedicated: String,
      additionalInfo: Boolean,
    },
    {
      timestamps: true,
      collection: "temples", // explicitly set the collection name
    }
  );

  const Temple = mongoose.model("Temple", schema);
  return Temple;
};
