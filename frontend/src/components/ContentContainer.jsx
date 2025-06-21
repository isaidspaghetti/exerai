import React, { useEffect, useState, useRef, useCallback } from 'react';
import { MovementCard } from './MovementCard';
import { Loading } from './Loading';

const ContentContainer = ({
  movements,
  isLoading,
  searchResults,
  triggerModal,
}) => {
  const [displayedItems, setDisplayedItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage] = useState(12);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const observerRef = useRef();
  const loadingRef = useRef();

  const data = searchResults || movements;

  useEffect(() => {
    if (data) {
      const initialItems = data.slice(0, itemsPerPage);
      setDisplayedItems(initialItems);
      setCurrentIndex(itemsPerPage);
      setHasMore(data.length > itemsPerPage);
    }
  }, [data, itemsPerPage]);

  const loadMoreItems = useCallback(() => {
    if (isLoadingMore || !data) return;

    setIsLoadingMore(true);

    setTimeout(() => {
      const nextItems = data.slice(currentIndex, currentIndex + itemsPerPage);
      setDisplayedItems((prev) => [...prev, ...nextItems]);
      setCurrentIndex((prev) => prev + itemsPerPage);
      setHasMore(currentIndex + itemsPerPage < data.length);
      setIsLoadingMore(false);
    }, 300);
  }, [data, currentIndex, itemsPerPage, isLoadingMore]);

  const lastElementRef = useCallback(
    (node) => {
      if (isLoadingMore) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreItems();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [isLoadingMore, hasMore, loadMoreItems],
  );

  const renderCards = (items) => {
    return items.map((item, index) => {
      const isLastElement =
        items.length === index + 1 && hasMore && !searchResults;
      return (
        <div key={item.id} ref={isLastElement ? lastElementRef : null}>
          <MovementCard
            name={item.name}
            thumbnail={item.thumbnailUrl}
            description={item.actionDescription}
            exerId={item.exerId}
            movementId={item.id}
            triggerModal={triggerModal}
          />
        </div>
      );
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      {!isLoading && displayedItems.length > 0 && renderCards(displayedItems)}

      {isLoadingMore && (
        <div ref={loadingRef} className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
          <span className="ml-2 text-gray-600">Loading more...</span>
        </div>
      )}

      {!hasMore && displayedItems.length > 0 && !searchResults && (
        <div className="text-center py-8 text-gray-500">
          You've reached the end of all movements
        </div>
      )}
    </div>
  );
};

export { ContentContainer };
