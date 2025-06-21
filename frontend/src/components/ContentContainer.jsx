import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import { Loading } from './Loading';
import { MovementCard } from './MovementCard';

const ContentContainer = ({ searchResults, triggerModal }) => {
  const [movements, setMovements] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage] = useState(12); // Load 12 items at a time
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const observerRef = useRef();
  const loadingRef = useRef();

  console.log('contentcontainer called');
  const fetchMovements = async () => {
    console.log('fetch movements');
    try {
      setIsLoading(true);
      const response = await axios.get(`${window.env.BASE_BE_URL}/movements/`);
      setMovements(response.data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  };

  // Load more items function
  const loadMoreItems = useCallback(() => {
    if (!movements || isLoadingMore) return;

    setIsLoadingMore(true);

    // Simulate loading delay for better UX
    setTimeout(() => {
      const nextItems = movements.slice(
        currentIndex,
        currentIndex + itemsPerPage,
      );
      setDisplayedItems((prev) => [...prev, ...nextItems]);
      setCurrentIndex((prev) => prev + itemsPerPage);
      setHasMore(currentIndex + itemsPerPage < movements.length);
      setIsLoadingMore(false);
    }, 300);
  }, [movements, currentIndex, itemsPerPage, isLoadingMore]);

  // Intersection Observer for infinite scroll
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

  useEffect(() => {
    if (searchResults) {
      setMovements(searchResults);
      setDisplayedItems(searchResults);
      setCurrentIndex(searchResults.length);
      setHasMore(false);
    } else {
      fetchMovements();
      setDisplayedItems([]);
      setCurrentIndex(0);
      setHasMore(true);
    }
  }, [searchResults]);

  // Initialize displayed items when movements change
  useEffect(() => {
    if (movements && !searchResults) {
      const initialItems = movements.slice(0, itemsPerPage);
      setDisplayedItems(initialItems);
      setCurrentIndex(itemsPerPage);
      setHasMore(movements.length > itemsPerPage);
    }
  }, [movements, searchResults, itemsPerPage]);

  const renderCards = (items) => {
    console.log('rendercards called', items);

    return items.map((item, index) => {
      // Add ref to last element for infinite scroll
      if (items.length === index + 1 && hasMore && !searchResults) {
        return (
          <div key={item.id} ref={lastElementRef}>
            <MovementCard
              name={item.name}
              thumbnail={item.thumbnailUrl}
              description={item.actionDescription}
              exerId={item.exerId}
              movementId={item.id}
              triggerModal={(type, id) => triggerModal(type, id)}
            />
          </div>
        );
      }

      return (
        <MovementCard
          key={item.id}
          name={item.name}
          thumbnail={item.thumbnailUrl}
          description={item.actionDescription}
          exerId={item.exerId}
          movementId={item.id}
          triggerModal={(type, id) => triggerModal(type, id)}
        />
      );
    });
  };

  return (
    <div>
      {isLoading && <Loading />}

      {/* Render cards */}
      {displayedItems.length > 0 && renderCards(displayedItems)}

      {/* Loading indicator for infinite scroll */}
      {isLoadingMore && (
        <div ref={loadingRef} className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-gray-600">Loading more...</span>
        </div>
      )}

      {/* End of results indicator */}
      {!hasMore && displayedItems.length > 0 && !searchResults && (
        <div className="text-center py-8 text-gray-500">
          You've reached the end of all movements
        </div>
      )}
    </div>
  );
};

export { ContentContainer };
